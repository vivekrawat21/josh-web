import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const PrivacyAndSecurity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-gray-600 text-sm sm:text-base"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 sm:mb-14"
      >
        Privacy Policy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 sm:mb-6"
      >
        The{" "}
        <a href="https://joshguru.com" className="text-blue-600 underline break-all">
          https://joshguru.com
        </a>{" "}
        website ("Website") is owned and operated by Josh Guru Inc. ("we," "us," or
        "our"). This Privacy Policy outlines how we collect, use, disclose, and
        safeguard your information when you use our website and services
        ("Platform").
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 sm:mb-6"
      >
        We provide a platform offering educational resources, professional
        insights, and industry connections. This Privacy Policy sets out the
        terms under which we process any personal information collected through:
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-4 sm:mb-6"
      >
        {[
          "The Website",
          "Any software or mobile applications we make available",
          "Interactions with industry partners and contractors",
          "Communication via telephone, email, or other physical mediums (such as referral forms)",
        ].map((item, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-start gap-2 mb-2"
          >
            <AiOutlineCheckCircle className="text-orange-500 shrink-0 mt-1" />
            <span>{item}</span>
          </motion.p>
        ))}
      </motion.div>

      {/* Sections */}
      {[
        {
          title: "Information We Collect",
          items: [
            { label: "Personal Information:", value: "Name, email, phone number, and profile details" },
            { label: "Usage Data:", value: "Device information, pages visited, and cookies" },
            { label: "Third-Party Information:", value: "Data from social media logins" },
          ],
        },
        {
          title: "How We Use Your Information",
          items: [
            "Operate and improve our Platform",
            "Enhance user experience",
            "Respond to inquiries and provide support",
            "Send updates and promotional content",
            "Ensure security and prevent fraud",
          ],
        },
        {
          title: "Sharing Your Information",
          description: "We do ",
          strong: "not",
          postfix: " sell your data. However, we may share it with:",
          items: [
            "Service providers (e.g., payment processors)",
            "Legal authorities when required",
            "Potential buyers in business transfers",
          ],
        },
        {
          title: "Data Security",
          paragraph:
            "We implement industry-standard security measures, but no online platform is 100% secure.",
        },
        {
          title: "Your Rights & Choices",
          paragraph: "You have the right to:",
          items: [
            "Access, update, or delete your data",
            "Opt-out of marketing communications",
            "Request data portability",
          ],
        },
        {
          title: "Contact Us",
          paragraph: "If you have questions, reach out at:",
          contact: "support@joshguru.com",
        },
      ].map((section, idx) => (
        <motion.section className="mb-6" key={idx}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">{section.title}</h2>

          {section.paragraph && <p className="mb-2">{section.paragraph}</p>}

          {section.description && (
            <p className="mb-2">
              {section.description}
              <strong>{section.strong}</strong>
              {section.postfix}
            </p>
          )}

          {section.items && (
            <div className="mt-2 space-y-2">
              {section.items.map((item, i) =>
                typeof item === "string" ? (
                  <p className="flex items-start gap-2" key={i}>
                    <AiOutlineCheckCircle className="text-orange-500 shrink-0 mt-1" />
                    {item}
                  </p>
                ) : (
                  <p className="flex items-start gap-2" key={i}>
                    <AiOutlineCheckCircle className="text-orange-500 shrink-0 mt-1" />
                    <span>
                      <strong>{item.label}</strong> {item.value}
                    </span>
                  </p>
                )
              )}
            </div>
          )}

          {section.contact && (
            <p>
              Email:{" "}
              <a href={`mailto:${section.contact}`} className="text-blue-600 underline break-all">
                {section.contact}
              </a>
            </p>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
};

export default PrivacyAndSecurity;
