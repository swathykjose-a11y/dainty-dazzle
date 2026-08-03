import { NextResponse } from "next/server";
import { createShopifyCheckout, type CheckoutItem } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: CheckoutItem[] = body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required" },
        { status: 400 },
      );
    }

    const { checkoutUrl } = await createShopifyCheckout(items);
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
