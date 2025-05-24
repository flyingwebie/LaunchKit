import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share any data with third parties
// - Children's data: we do not collect any data from children
// - Updates to the privacy policy: users will be updated by email
// - Contact: users can contact us by email at marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for ShipFast
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Effective Date: September 11, 2023

Welcome to ShipFast!

This Privacy Policy describes how ShipFast ("we," "our," or "us") collects, uses, and protects your information when you visit our website https://shipfa.st ("Service").

**1. Information We Collect**

We collect the following personal information:
- Name
- Email address
- Payment information

We also collect non-personal data through web cookies to improve your experience on our website.

**2. Purpose of Data Collection**

We collect your personal information solely for order processing purposes. This includes:
- Processing your purchases
- Sending order confirmations
- Providing customer support
- Communicating about your orders

**3. Data Sharing**

We do not share, sell, rent, or trade your personal information with any third parties.

**4. Children's Privacy**

We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at marc@shipfa.st.

**5. Data Security**

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

**6. Cookies**

Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how you use our website.

**7. Updates to This Privacy Policy**

We may update this Privacy Policy from time to time. When we do, we will notify you by email. We encourage you to review this Privacy Policy periodically for any changes.

**8. Contact Us**

If you have any questions about this Privacy Policy, please contact us at:
Email: marc@shipfa.st

**9. Your Rights**

You have the right to:
- Access your personal information
- Correct inaccurate information
- Request deletion of your information
- Withdraw consent for data processing

To exercise these rights, please contact us at marc@shipfa.st.

By using ShipFast, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of your information as described herein.`}
        </pre>
      </div>
    </main>
  );
}
