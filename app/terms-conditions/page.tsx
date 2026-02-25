import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { navItems } from "@/_data/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsConditions() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header navItems={navItems} />
      <main className="flex-1 container mx-auto px-4 py-8 text-white max-w-4xl pt-32">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="space-y-4 text-white/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              1. Introduction
            </h2>
            <p>
              Welcome to Cover Letter AI & Resume Maker. These terms and
              conditions outline the rules and regulations for the use of our
              application.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">2. License</h2>
            <p>
              Unless otherwise stated, Cover Letter AI & Resume Maker and/or its
              licensors own the intellectual property rights for all material on
              this app. All intellectual property rights are reserved. You may
              access this from Cover Letter AI & Resume Maker for your own
              personal use subjected to restrictions set in these terms and
              conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              3. User Responsibilities
            </h2>
            <p>You must not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Republish material from Cover Letter AI & Resume Maker</li>
              <li>
                Sell, rent or sub-license material from Cover Letter AI & Resume
                Maker
              </li>
              <li>
                Reproduce, duplicate or copy material from Cover Letter AI &
                Resume Maker
              </li>
              <li>Redistribute content from Cover Letter AI & Resume Maker</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">4. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at: support@example.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
