import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const PrivacyAndSecurity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-700"
    >
      {/* Header Section */}
      <div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 text-sm sm:text-base"
        >
          <p>
            The{" "}
            <a href="https://joshguru.com" className="text-blue-600 hover:text-blue-800 underline break-all">
              https://joshguru.com
            </a>{" "}
            website ("Website") is owned and operated by Josh Guru Inc. ("we," "us," or
            "our").
          </p>
          
          <p>
            We provide a platform offering educational resources, professional
            insights, and industry connections. This Privacy Policy sets out the
            terms under which we process any personal information collected through:
          </p>

          <div className="space-y-2 pl-2">
            {[
              "The Website",
              "Any software or mobile applications we make available",
              "Interactions with industry partners and contractors",
              "Communication via telephone, email, or other physical mediums",
            ].map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-start gap-2"
              >
                <AiOutlineCheckCircle className="text-orange-500 shrink-0 mt-0.5 text-lg" />
                <span>{item}</span>
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
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
            content: "We implement industry-standard security measures, but no online platform is 100% secure. We regularly review our security practices to protect your information.",
          },
          {
            title: "Your Rights & Choices",
            content: "You have the right to:",
            items: [
              "Access, update, or delete your data",
              "Opt-out of marketing communications",
              "Request data portability",
              "Withdraw consent where applicable",
            ],
          },
          {
            title: "Changes to This Policy",
            content: "We may update this policy periodically. We'll notify you of significant changes through our website or email.",
          },
          {
            title: "Contact Us",
            content: "If you have any questions about this Privacy Policy:",
            contact: "support@joshguru.com",
          },
        ].map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * idx }}
            className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              {section.title}
            </h2>

            {section.content && <p className="mb-3 text-sm sm:text-base">{section.content}</p>}

            {section.description && (
              <p className="mb-3 text-sm sm:text-base">
                {section.description}
                <strong className="font-medium">{section.strong}</strong>
                {section.postfix}
              </p>
            )}

            {section.items && (
              <div className="mt-3 space-y-2 pl-1">
                {section.items.map((item, i) =>
                  typeof item === "string" ? (
                    <p className="flex items-start gap-2 text-sm sm:text-base" key={i}>
                      <AiOutlineCheckCircle className="text-orange-500 shrink-0 mt-0.5 text-lg" />
                      {item}
                    </p>
                  ) : (
                    <p className="flex items-start gap-2 text-sm sm:text-base" key={i}>
                      <AiOutlineCheckCircle className="text-orange-500 shrink-0 mt-0.5 text-lg" />
                      <span>
                        <strong className="font-medium">{item.label}</strong> {item.value}
                      </span>
                    </p>
                  )
                )}
              </div>
            )}

            {section.contact && (
              <p className="mt-3 text-sm sm:text-base">
                Email:{" "}
                <a href={`mailto:${section.contact}`} className="text-blue-600 hover:text-blue-800 underline break-all">
                  {section.contact}
                </a>
              </p>
            )}
          </motion.section>
        ))}
      </div>

      {/* Last Updated */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-center text-sm text-gray-500"
      >
        Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </motion.div>
    </motion.div>
  );
};

export default PrivacyAndSecurity;