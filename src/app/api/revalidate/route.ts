import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;

// Verify Shopify webhook HMAC signature
async function verifyWebhook(
  body: string,
  hmacHeader: string | null,
): Promise<boolean> {
  if (!SHOPIFY_WEBHOOK_SECRET || !hmacHeader) return false;

  const digest = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(body, "utf-8")
    .digest("base64");

  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(hmacHeader),
  );
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const hmac = request.headers.get("x-shopify-hmac-sha256");

    // Verify the webhook came from Shopify
    const isValid = await verifyWebhook(rawBody, hmac);

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const topic = request.headers.get("x-shopify-topic");
    console.log(`[Revalidate] Received webhook: ${topic}`);

    // Revalidate all product and collection pages
    revalidatePath("/", "layout");
    revalidatePath("/products/[handle]", "page");
    revalidatePath("/collections/[handle]", "page");

    return NextResponse.json({
      revalidated: true,
      topic,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 },
    );
  }
}
