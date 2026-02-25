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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header navItems={navItems} />
      <main className="flex-1 container mx-auto px-4 py-8 text-white max-w-4xl pt-32">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-4 text-white/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              1. Introduction
            </h2>
            <p>
              Welcome to Cover Letter AI & Resume Maker. We respect your privacy
              and are committed to protecting your personal data. This privacy
              policy will inform you as to how we look after your personal data
              when you visit our website and tell you about your privacy rights
              and how the law protects you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              2. Data We Collect
            </h2>
            <p>
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Identity Data includes first name, last name, username or
                similar identifier.
              </li>
              <li>
                Contact Data includes email address and telephone numbers.
              </li>
              <li>
                Technical Data includes internet protocol (IP) address, your
                login data, browser type and version, time zone setting and
                location, browser plug-in types and versions, operating system
                and platform and other technology on the devices you use to
                access this website.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              3. How We Use Your Data
            </h2>
            <p>
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Where we need to perform the contract we are about to enter into
                or have entered into with you.
              </li>
              <li>
                Where it is necessary for our legitimate interests (or those of
                a third party) and your interests and fundamental rights do not
                override those interests.
              </li>
              <li>
                Where we need to comply with a legal or regulatory obligation.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">4. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at: support@example.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
