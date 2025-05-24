import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Children's data: we do not collect any data from children
// - Updates to the terms: users will be updated by email
// - Contact: users can contact us by email at marc@shipfa.st

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

export default function TOS() {
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
          Terms and Conditions for ShipFast
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Effective Date: September 11, 2023

Welcome to ShipFast!

These Terms and Conditions ("Terms") govern your use of the ShipFast website located at https://shipfa.st ("Service") operated by ShipFast ("we," "our," or "us").

By accessing or using our Service, you agree to be bound by these Terms. If you do not agree with any part of these terms, then you may not access the Service.

**1. Description of Service**

ShipFast provides a JavaScript code boilerplate designed to help entrepreneurs launch their startups faster.

**2. Purchases and Ownership**

When you purchase a package from ShipFast:
- You will receive downloadable code that you can use to create applications.
- You own the code you download, but you do not have the right to resell the original boilerplate code.
- You may request a full refund within 7 days after your purchase.

**3. User Data Collection**

We collect the following personal data:
- Name
- Email address  
- Payment information

We also collect non-personal data through web cookies to improve your experience on our website.

**4. Children's Privacy**

We do not knowingly collect any personal data from children under the age of 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately.

**5. Updates to Terms**

We may update these Terms from time to time. When we do, we will notify you by email. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.

**6. Contact Information**

If you have any questions about these Terms, please contact us at:
Email: marc@shipfa.st

**7. Limitation of Liability**

In no event shall ShipFast, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.

**8. Governing Law**

These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions.

**9. Severability**

If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

By using ShipFast, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.`}
        </pre>
      </div>
    </main>
  );
}
