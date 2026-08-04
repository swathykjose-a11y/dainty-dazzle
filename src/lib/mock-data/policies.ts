// TODO: replace with Shopify Storefront API
// Mock policy content for all four policy pages.

export interface PolicyData {
  slug: string;
  title: string;
  contentHtml: string;
}

export const mockPolicies: PolicyData[] = [
  {
    slug: "shipping",
    title: "Shipping Policy",
    contentHtml: `
      <h2>Domestic Shipping</h2>
      <p>All orders ship from our studio within 2–5 business days via India Post. Standard shipping is complimentary on orders over ₹999. Orders under ₹999 ship for a flat ₹79.</p>
      <h3>Express Shipping</h3>
      <p>Speed Post (2–4 days): ₹149<br/>Express delivery is available for select pin codes.</p>
      <h2>Order Tracking</h2>
      <p>You'll receive a tracking number via email and WhatsApp once your order ships. Allow 24 hours for tracking information to update.</p>
      <h2>Shipping Partner</h2>
      <p>We ship via India Post for reliable nationwide coverage. Delivery typically takes 5–7 business days depending on your location.</p>
    `,
  },
  {
    slug: "returns",
    title: "Return & Refund Policy",
    contentHtml: `
      <h2>Returns</h2>
      <p>We accept returns within 7 days of delivery for unworn items in original packaging. To initiate a return, email us at hello@daintydazzle.com or message us on Instagram @dainty_dazzle__ with your order number.</p>
      <h2>Refunds</h2>
      <p>Refunds are processed within 5–7 business days of receiving the returned item. The original shipping cost is non-refundable. Refunds are issued to the original payment method (UPI, bank account, or card).</p>
      <h2>Exchanges</h2>
      <p>We're happy to exchange for a different style. Contact us and we'll arrange the swap — return shipping on exchanges is on us.</p>
      <h2>Damaged Items</h2>
      <p>If you receive a damaged or defective item, please contact us within 48 hours with photos. We'll send a replacement at no extra cost.</p>
    `,
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    contentHtml: `
      <h2>Agreement to Terms</h2>
      <p>By accessing or using daintydazzle.com, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site.</p>
      <h2>Products & Pricing</h2>
      <p>All prices are listed in Indian Rupees (₹) and are subject to change without notice. We reserve the right to correct pricing errors. Product images are representative; slight variations in color and finish are natural for handcrafted jewelry.</p>
      <h2>Intellectual Property</h2>
      <p>All content on this site — including photographs, copy, and design — is the property of Dainty Dazzle Jewelry and may not be reproduced without permission.</p>
      <h2>Limitation of Liability</h2>
      <p>Dainty Dazzle Jewelry is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
    `,
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    contentHtml: `
      <h2>Information We Collect</h2>
      <p>When you make a purchase, we collect your name, email address, phone number, shipping address, and payment information. We also collect browsing data through cookies to improve your shopping experience.</p>
      <h2>How We Use Your Information</h2>
      <p>Your information is used to process orders, send shipping notifications via email and WhatsApp, and (if you opt in) share new arrivals and promotions. We never sell your personal data to third parties.</p>
      <h2>Cookies</h2>
      <p>We use essential cookies for cart functionality and analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings.</p>
      <h2>Data Retention</h2>
      <p>Order data is retained for 7 years for tax and legal compliance. You can request deletion of your personal data at any time by emailing hello@daintydazzle.com.</p>
      <h2>Contact</h2>
      <p>For privacy-related inquiries, contact us at hello@daintydazzle.com or DM us on Instagram @dainty_dazzle__.</p>
    `,
  },
];
