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
      <p>All orders ship from our studio within 1–3 business days. Standard shipping (USPS First Class) is complimentary on orders over $150. Orders under $150 ship for a flat $5.95.</p>
      <h3>Expedited Shipping</h3>
      <p>Priority Mail (2–3 days): $12.95<br/>Express Mail (1–2 days): $24.95</p>
      <h2>International Shipping</h2>
      <p>We ship worldwide via USPS International. Rates are calculated at checkout based on weight and destination. Delivery typically takes 7–21 business days. Import duties and taxes are the responsibility of the buyer.</p>
      <h2>Order Tracking</h2>
      <p>You'll receive a tracking number via email once your order ships. Allow 24 hours for tracking information to update.</p>
    `,
  },
  {
    slug: "returns",
    title: "Return & Refund Policy",
    contentHtml: `
      <h2>Returns</h2>
      <p>We accept returns within 14 days of delivery for unworn items in original packaging. To initiate a return, email us at hello@daintydazzle.com with your order number.</p>
      <h2>Refunds</h2>
      <p>Refunds are processed within 5 business days of receiving the returned item. The original shipping cost is non-refundable. Refunds are issued to the original payment method.</p>
      <h2>Exchanges</h2>
      <p>We're happy to exchange for a different size or style. Email us and we'll arrange the swap — return shipping on exchanges is on us.</p>
      <h2>Final Sale Items</h2>
      <p>Items marked "Final Sale" cannot be returned or exchanged. This includes custom-engraved pieces.</p>
    `,
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    contentHtml: `
      <h2>Agreement to Terms</h2>
      <p>By accessing or using daintydazzle.com, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site.</p>
      <h2>Products & Pricing</h2>
      <p>All prices are listed in USD and are subject to change without notice. We reserve the right to correct pricing errors. Product images are representative; slight variations in color and finish are natural for handcrafted jewelry.</p>
      <h2>Intellectual Property</h2>
      <p>All content on this site — including photographs, copy, and design — is the property of Dainty Dazzle and may not be reproduced without permission.</p>
      <h2>Limitation of Liability</h2>
      <p>Dainty Dazzle is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
    `,
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    contentHtml: `
      <h2>Information We Collect</h2>
      <p>When you make a purchase, we collect your name, email address, shipping address, and payment information. We also collect browsing data through cookies to improve your shopping experience.</p>
      <h2>How We Use Your Information</h2>
      <p>Your information is used to process orders, send shipping notifications, and (if you opt in) share new arrivals and promotions. We never sell your personal data to third parties.</p>
      <h2>Cookies</h2>
      <p>We use essential cookies for cart functionality and analytics cookies (Google Analytics) to understand how visitors use our site. You can disable cookies in your browser settings.</p>
      <h2>Data Retention</h2>
      <p>Order data is retained for 7 years for tax and legal compliance. You can request deletion of your personal data at any time by emailing hello@daintydazzle.com.</p>
      <h2>Contact</h2>
      <p>For privacy-related inquiries, contact us at hello@daintydazzle.com.</p>
    `,
  },
];
