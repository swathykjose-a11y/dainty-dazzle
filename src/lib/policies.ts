// ─── Local Policy Content ────────────────────────────────────────────────────
// Dropshipping-specific policies for Dainty Dazzle.
// These serve as the primary source; Shopify policies are a fallback.
// ─────────────────────────────────────────────────────────────────────────────

export interface PolicyData {
  slug: string;
  title: string;
  contentHtml: string;
}

const LAST_UPDATED = "20 August 2025";

// ─── Shipping & Delivery ────────────────────────────────────────────────────

const shippingPolicy: PolicyData = {
  slug: "shipping",
  title: "Shipping & Delivery Policy",
  contentHtml: `
<p><strong>Last Updated:</strong> ${LAST_UPDATED}</p>

<p>Thank you for shopping with Dainty Dazzle. We are committed to delivering your jewellery orders as efficiently as possible. Please read the following policy carefully so you know what to expect when you place an order with us.</p>

<h2>How We Fulfil Orders</h2>
<p>Dainty Dazzle partners with trusted third-party suppliers and fulfilment centres to source, package, and ship products directly to you. Because of this model, your order may be shipped from a different location depending on the product and supplier availability. This allows us to offer a wider selection of jewellery while keeping costs competitive.</p>

<h2>Processing Times</h2>
<p>Once your order is confirmed and payment is received, it typically takes <strong>1–5 business days</strong> to process before it is dispatched. Processing times may vary depending on the product, supplier availability, and order volume. During peak seasons, festivals, or promotional sales, processing may take slightly longer.</p>
<p>You will receive an email confirmation once your order has been placed, and a separate dispatch notification once it has shipped.</p>

<h2>Estimated Delivery Times</h2>
<p>Delivery times depend on your location and the fulfilment centre handling your order:</p>
<ul>
  <li><strong>Domestic (within India):</strong> 5–15 business days after dispatch</li>
  <li><strong>International:</strong> 10–30 business days after dispatch</li>
</ul>
<p>These are estimates only. Actual delivery times may vary due to factors beyond our control, including courier delays, weather events, customs processing, and public holidays.</p>

<h2>Separate Shipments</h2>
<p>If you order multiple items, they may be shipped separately from different fulfilment centres. Each shipment may arrive at different times and may have its own tracking number. You will be notified of each shipment individually.</p>

<h2>Order Tracking</h2>
<p>Once your order is dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your package. Please allow 24–48 hours after receiving the tracking number for tracking information to update in the carrier's system.</p>
<p>If you do not receive tracking information within 7 business days of placing your order, please contact our support team.</p>

<h2>Shipping Costs</h2>
<p>Shipping fees, if applicable, are calculated at checkout based on your delivery address and the items in your cart. Any free shipping promotions or thresholds will be clearly displayed on our website.</p>

<h2>Customs, Duties &amp; Import Charges</h2>
<p>For international orders, your package may be subject to customs duties, import taxes, or additional fees levied by your country's customs authority. These charges are <strong>the responsibility of the customer</strong> and are not included in our product prices or shipping fees. Dainty Dazzle has no control over these charges and cannot predict their amount.</p>
<p>We recommend contacting your local customs office for information on applicable duties before placing an international order.</p>

<h2>Incorrect or Incomplete Addresses</h2>
<p>Please ensure that your shipping address is complete and accurate at the time of checkout. Dainty Dazzle is not responsible for orders that are delayed, returned, or lost due to incorrect or incomplete address information provided by the customer. If a package is returned to the fulfilment centre because of an address error, re-shipping costs may apply.</p>

<h2>Shipping Delays</h2>
<p>While we strive to deliver every order within the estimated timeframe, delays can occur due to:</p>
<ul>
  <li>High order volumes during sales or festive seasons</li>
  <li>Carrier or logistics disruptions</li>
  <li>Customs processing for international shipments</li>
  <li>Adverse weather conditions or natural events</li>
  <li>Public holidays in the origin or destination country</li>
</ul>
<p>If your order has not arrived within a reasonable time beyond the estimated delivery window, please contact us so we can investigate and assist you.</p>

<h2>Undeliverable Packages</h2>
<p>If a package is returned to us as undeliverable (due to an incorrect address, failed delivery attempts, or refusal to accept), we will contact you to arrange re-shipment. Additional shipping charges may apply.</p>

<h2>Contact Us</h2>
<p>If you have any questions about shipping or need help with a delivery issue, please reach out to us via our Instagram page <a href="https://www.instagram.com/dainty_dazzle__" target="_blank" rel="noopener noreferrer">@dainty_dazzle__</a> or through the contact details provided on our website.</p>
`,
};

// ─── Returns & Refunds ──────────────────────────────────────────────────────

const returnsPolicy: PolicyData = {
  slug: "returns",
  title: "Returns & Refunds Policy",
  contentHtml: `
<p><strong>Last Updated:</strong> ${LAST_UPDATED}</p>

<p>At Dainty Dazzle, we want you to be completely satisfied with your purchase. Since we operate as a dropshipping business and our products are fulfilled by third-party suppliers, please review the following policy carefully to understand how returns and refunds are handled.</p>

<h2>Eligibility for Returns &amp; Refunds</h2>
<p>We accept return and refund requests under the following circumstances:</p>
<ul>
  <li><strong>Damaged items:</strong> The product arrived broken, damaged, or in a condition that makes it unusable.</li>
  <li><strong>Defective items:</strong> The product has a manufacturing defect that affects its quality or appearance.</li>
  <li><strong>Incorrect items:</strong> You received a product different from what you ordered.</li>
  <li><strong>Missing items:</strong> One or more items from your order did not arrive (and the estimated delivery window has passed).</li>
</ul>

<h2>Non-Returnable Items</h2>
<p>Due to the nature of jewellery and hygiene considerations, the following items are <strong>not eligible</strong> for return or exchange:</p>
<ul>
  <li>Items that have been worn, altered, or resized</li>
  <li>Items without original tags or packaging</li>
  <li>Items returned due to a change of mind, unless otherwise required by applicable consumer protection laws</li>
  <li>Items purchased during final-sale or clearance promotions (unless defective or damaged)</li>
</ul>

<h2>How to Request a Return or Refund</h2>
<p>To initiate a return or refund, please follow these steps:</p>
<ol>
  <li><strong>Contact us</strong> within <strong>7 days</strong> of receiving your order via our Instagram page <a href="https://www.instagram.com/dainty_dazzle__" target="_blank" rel="noopener noreferrer">@dainty_dazzle__</a> or through the contact details on our website.</li>
  <li><strong>Provide your order number</strong>, a description of the issue, and <strong>clear photographs</strong> showing the damage, defect, or incorrect item.</li>
  <li>Our team will review your request and respond within <strong>2–3 business days</strong>.</li>
</ol>

<h2>Return Shipping</h2>
<p>Because our products are shipped from third-party fulfilment centres, <strong>we may not require you to return the item</strong> in many cases. Instead, we may offer a replacement or refund based on the photographic evidence you provide.</p>
<p>If a return is required, we will provide you with instructions. Return shipping costs may be covered by Dainty Dazzle if the return is due to our error (wrong or defective item). For all other cases, the customer is responsible for return shipping.</p>

<h2>Refund Process</h2>
<p>Once your return or refund request is approved:</p>
<ul>
  <li>Refunds will be processed to your <strong>original payment method</strong>.</li>
  <li>Please allow <strong>5–10 business days</strong> for the refund to appear in your account, depending on your bank or payment provider.</li>
  <li>Shipping fees paid at checkout are <strong>non-refundable</strong> unless the return is due to our error.</li>
</ul>

<h2>Replacements</h2>
<p>If your item is eligible for a replacement, we will ship a new product to you at no additional cost. Replacement availability depends on current stock with our suppliers. If the item is out of stock, we will issue a full refund instead.</p>

<h2>Cancellations</h2>
<p>You may request to cancel your order <strong>before it has been dispatched</strong>. Once an order has been shipped, it cannot be cancelled — you will need to follow the return process outlined above after receiving the item.</p>
<p>To request a cancellation, contact us as soon as possible with your order number. If the order has already been processed by our fulfilment partner, we may not be able to cancel it.</p>

<h2>Late or Missing Refunds</h2>
<p>If you have not received your refund within the timeframe mentioned above:</p>
<ol>
  <li>Check your bank account or payment app again.</li>
  <li>Contact your bank or credit card company — processing times can vary.</li>
  <li>If you have completed these steps and still have not received your refund, please contact us.</li>
</ol>

<h2>Contact Us</h2>
<p>For all return and refund enquiries, please reach out via our Instagram page <a href="https://www.instagram.com/dainty_dazzle__" target="_blank" rel="noopener noreferrer">@dainty_dazzle__</a> or through the contact details provided on our website.</p>
`,
};

// ─── Terms & Conditions ─────────────────────────────────────────────────────

const termsPolicy: PolicyData = {
  slug: "terms",
  title: "Terms & Conditions",
  contentHtml: `
<p><strong>Last Updated:</strong> ${LAST_UPDATED}</p>

<p>Welcome to Dainty Dazzle. By accessing or using our website and placing an order, you agree to be bound by these Terms &amp; Conditions. Please read them carefully before making a purchase.</p>

<h2>About Us</h2>
<p>Dainty Dazzle is an online jewellery store operating under a dropshipping model. This means that the products listed on our website are sourced from and fulfilled by trusted third-party suppliers. We curate the product selection, manage the storefront, handle customer service, and facilitate the ordering process, while our supplier partners handle inventory, packaging, and shipping.</p>

<h2>Eligibility</h2>
<p>By using this website and placing an order, you confirm that:</p>
<ul>
  <li>You are at least 18 years of age, or have the consent of a parent or legal guardian.</li>
  <li>The information you provide during registration or checkout is accurate and complete.</li>
  <li>You have the legal authority to enter into a binding agreement.</li>
</ul>

<h2>Products &amp; Availability</h2>
<p>We make every effort to display our products accurately on the website, including descriptions, images, and pricing. However, please note:</p>
<ul>
  <li>Product images are for illustration purposes. Actual colours and appearance may vary slightly due to screen settings and photographic lighting.</li>
  <li>Product availability is subject to stock held by our third-party suppliers and may change without notice.</li>
  <li>If a product you have ordered becomes unavailable after your order is placed, we will notify you and offer a full refund or a suitable alternative.</li>
</ul>

<h2>Pricing &amp; Payments</h2>
<ul>
  <li>All prices are listed in Indian Rupees (₹) unless stated otherwise.</li>
  <li>Prices are subject to change without prior notice. The price charged will be the price displayed at the time of your order.</li>
  <li>We use secure third-party payment gateways to process your transactions. Dainty Dazzle does not store your credit/debit card information.</li>
  <li>Payment must be completed in full before your order is processed and dispatched.</li>
</ul>

<h2>Order Acceptance</h2>
<p>Placing an order on our website constitutes an offer to purchase. We reserve the right to accept or decline any order for any reason, including but not limited to:</p>
<ul>
  <li>Product unavailability</li>
  <li>Errors in pricing or product information</li>
  <li>Suspected fraudulent activity</li>
  <li>Inability to verify payment or delivery information</li>
</ul>
<p>If we are unable to fulfil your order, we will notify you promptly and issue a full refund.</p>

<h2>Third-Party Suppliers</h2>
<p>As a dropshipping business, Dainty Dazzle works with third-party suppliers to fulfil orders. While we carefully select our partners, we do not directly manufacture, warehouse, or ship the products ourselves. We are committed to resolving any issues that arise from the fulfilment process, but we cannot guarantee the performance of third-party logistics and shipping carriers.</p>

<h2>Shipping &amp; Delivery</h2>
<p>For full details on processing times, delivery estimates, tracking, customs duties, and related topics, please refer to our <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>.</p>

<h2>Returns &amp; Refunds</h2>
<p>For information on returns, refunds, replacements, and cancellations, please refer to our <a href="/policies/returns">Returns &amp; Refunds Policy</a>.</p>

<h2>Intellectual Property</h2>
<p>All content on this website — including text, graphics, logos, images, product photography, and design — is the property of Dainty Dazzle or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or republish any content from this website without prior written consent.</p>

<h2>User Conduct</h2>
<p>By using our website, you agree not to:</p>
<ul>
  <li>Use the site for any unlawful purpose</li>
  <li>Attempt to gain unauthorised access to our systems or accounts</li>
  <li>Submit false or misleading information</li>
  <li>Interfere with the website's functionality or other users' experience</li>
  <li>Scrape, crawl, or extract data from the website without permission</li>
</ul>

<h2>Limitation of Liability</h2>
<p>To the fullest extent permitted by law:</p>
<ul>
  <li>Dainty Dazzle shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</li>
  <li>Our total liability for any claim related to an order shall not exceed the amount you paid for that specific order.</li>
  <li>We are not liable for delays, losses, or damages caused by third-party carriers, customs authorities, or events beyond our reasonable control (force majeure).</li>
</ul>

<h2>Indemnification</h2>
<p>You agree to indemnify and hold harmless Dainty Dazzle, its owners, employees, and partners from any claims, damages, or expenses arising from your use of the website, violation of these terms, or infringement of any third-party rights.</p>

<h2>Governing Law</h2>
<p>These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in the relevant jurisdiction where Dainty Dazzle operates.</p>

<h2>Changes to These Terms</h2>
<p>We reserve the right to update or modify these Terms &amp; Conditions at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>

<h2>Contact Us</h2>
<p>If you have any questions about these Terms &amp; Conditions, please reach out via our Instagram page <a href="https://www.instagram.com/dainty_dazzle__" target="_blank" rel="noopener noreferrer">@dainty_dazzle__</a> or through the contact details provided on our website.</p>
`,
};

// ─── Privacy Policy ─────────────────────────────────────────────────────────

const privacyPolicy: PolicyData = {
  slug: "privacy",
  title: "Privacy Policy",
  contentHtml: `
<p><strong>Last Updated:</strong> ${LAST_UPDATED}</p>

<p>Dainty Dazzle ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard your personal information when you visit our website or make a purchase.</p>

<h2>Information We Collect</h2>
<p>We collect the following types of information:</p>

<h3>Information You Provide</h3>
<ul>
  <li><strong>Contact details:</strong> Name, email address, phone number</li>
  <li><strong>Shipping information:</strong> Delivery address, city, state/province, postal code, country</li>
  <li><strong>Payment information:</strong> Payment details are collected and processed securely by our third-party payment gateway. We do not store your credit/debit card numbers.</li>
  <li><strong>Order details:</strong> Products purchased, order history, and transaction records</li>
  <li><strong>Communications:</strong> Any messages or enquiries you send to us via email, social media, or contact forms</li>
</ul>

<h3>Information Collected Automatically</h3>
<ul>
  <li><strong>Device information:</strong> Browser type, operating system, device type, screen resolution</li>
  <li><strong>Usage data:</strong> Pages visited, time spent on site, referring URLs, click patterns</li>
  <li><strong>IP address and approximate location</strong></li>
  <li><strong>Cookies and similar technologies</strong> (see "Cookies" section below)</li>
</ul>

<h2>How We Use Your Information</h2>
<p>We use your personal information for the following purposes:</p>
<ul>
  <li><strong>Order fulfilment:</strong> Processing and delivering your orders, including sharing necessary details with our third-party suppliers and shipping carriers</li>
  <li><strong>Customer service:</strong> Responding to your enquiries, resolving issues, and processing returns or refunds</li>
  <li><strong>Communication:</strong> Sending order confirmations, shipping updates, and delivery notifications</li>
  <li><strong>Marketing:</strong> With your consent, sending promotional emails about new products, offers, and updates. You may unsubscribe at any time.</li>
  <li><strong>Website improvement:</strong> Analysing usage patterns to improve our website, product offerings, and overall experience</li>
  <li><strong>Legal compliance:</strong> Meeting our legal and regulatory obligations</li>
</ul>

<h2>Sharing Your Information</h2>
<p>As a dropshipping business, we work with third-party partners to fulfil your orders. We may share your information with:</p>
<ul>
  <li><strong>Fulfilment partners &amp; suppliers:</strong> Your name, shipping address, and order details are shared with our third-party suppliers so they can package and ship your products directly to you.</li>
  <li><strong>Shipping carriers:</strong> Your delivery address and contact information are shared with logistics providers for delivery purposes.</li>
  <li><strong>Payment processors:</strong> Your payment information is securely processed by third-party payment gateways (e.g., Shopify Payments, Razorpay, or similar services).</li>
  <li><strong>Analytics providers:</strong> We may use analytics tools (such as Google Analytics) that collect anonymised data about website usage.</li>
  <li><strong>Legal authorities:</strong> If required by law, court order, or governmental request.</li>
</ul>
<p>We do <strong>not</strong> sell, rent, or trade your personal information to third parties for their own marketing purposes.</p>

<h2>Cookies</h2>
<p>Our website uses cookies and similar technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:</p>
<ul>
  <li>Remember your preferences and cart contents</li>
  <li>Understand how you interact with our website</li>
  <li>Provide personalised content and recommendations</li>
  <li>Analyse website traffic and performance</li>
</ul>

<h3>Types of Cookies We Use</h3>
<ul>
  <li><strong>Essential cookies:</strong> Required for the website to function properly (e.g., shopping cart, checkout process). These cannot be disabled.</li>
  <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site so we can improve it.</li>
  <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.</li>
</ul>
<p>You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>

<h2>Data Security</h2>
<p>We implement appropriate technical and organisational measures to protect your personal information, including:</p>
<ul>
  <li>SSL/TLS encryption for all data transmitted between your browser and our website</li>
  <li>Secure payment processing through PCI-compliant third-party providers</li>
  <li>Restricted access to personal data on a need-to-know basis</li>
</ul>
<p>While we take data security seriously, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your information to the best of our ability.</p>

<h2>Data Retention</h2>
<p>We retain your personal information for as long as necessary to:</p>
<ul>
  <li>Fulfil the purposes outlined in this policy</li>
  <li>Comply with legal and regulatory requirements</li>
  <li>Resolve disputes and enforce our agreements</li>
</ul>
<p>If you request deletion of your data, we will process your request in accordance with applicable laws, subject to any legal obligations that require us to retain certain information.</p>

<h2>Your Rights</h2>
<p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
<ul>
  <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
  <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal requirements</li>
  <li><strong>Objection:</strong> Object to certain types of processing, including direct marketing</li>
  <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
  <li><strong>Withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
</ul>
<p>To exercise any of these rights, please contact us using the details below.</p>

<h2>Third-Party Links</h2>
<p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.</p>

<h2>Children's Privacy</h2>
<p>Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete that information promptly.</p>

<h2>Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Updates will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.</p>

<h2>Contact Us</h2>
<p>If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out via our Instagram page <a href="https://www.instagram.com/dainty_dazzle__" target="_blank" rel="noopener noreferrer">@dainty_dazzle__</a> or through the contact details provided on our website.</p>
`,
};

// ─── Exports ─────────────────────────────────────────────────────────────────

const ALL_POLICIES: PolicyData[] = [
  shippingPolicy,
  returnsPolicy,
  termsPolicy,
  privacyPolicy,
];

/**
 * Returns all local dropshipping-specific policies.
 */
export function getLocalPolicies(): PolicyData[] {
  return ALL_POLICIES;
}

/**
 * Returns a single local policy by slug, or null if not found.
 */
export function getLocalPolicyBySlug(slug: string): PolicyData | null {
  return ALL_POLICIES.find((p) => p.slug === slug) ?? null;
}
