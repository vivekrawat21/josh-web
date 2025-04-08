import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Disclaimer</h1>
      <p className="mb-4">
        The information provided by <strong>Joshguru</strong> (“we,” “us” or “our”) on our
        platform is for general informational purposes only. All information on the
        Site is provided in good faith; however, we make no representation or warranty
        of any kind regarding the accuracy, adequacy, validity, reliability, or
        completeness of any information.
      </p>

      <p className="mb-4">
        Under no circumstances shall we have any liability to you for any loss or
        damage of any kind incurred as a result of the use of the site or reliance on
        any information provided. Your use of the site and your reliance on any
        information is solely at your own risk.
      </p>

      <p className="mb-4">
        Joshguru does not offer financial, legal, or professional advice. The
        courses, services, and content are for educational and informational purposes
        only.
      </p>
    </div>
  );
};

export default Disclaimer;
