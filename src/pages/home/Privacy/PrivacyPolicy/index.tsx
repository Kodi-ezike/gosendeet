export const LawfulBasisTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-black border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-3 text-left font-bold">
              Purpose
            </th>
            <th className="border border-black p-3 text-left font-bold">
              Lawful Basis
            </th>
          </tr>
        </thead>

        <tbody>
          <Section title="Core Shipping Services" />

          <Row
            purpose="Comparing carrier rates and booking shipments"
            basis="Performance of a contract"
          />
          <Row
            purpose="Arranging pickups, deliveries, and tracking"
            basis="Performance of a contract"
          />
          <Row
            purpose="Verifying shipment details and compliance"
            basis="Legal obligation; Legitimate interest (network security)"
          />
          <Row
            purpose="Handling payments and invoices"
            basis="Performance of a contract"
          />

          <Section title="Customer Relationship Management" />

          <Row
            purpose="Personalizing your experience (e.g., saved preferences)"
            basis="Legitimate interest; Consent"
          />
          <Row
            purpose="Sending service updates or promotions"
            basis="Legitimate interest; Consent"
          />
          <Row
            purpose="Gathering feedback via surveys or calls"
            basis="Legitimate interest; Consent"
          />
          <Row
            purpose="Onboarding new users"
            basis="Performance of a contract"
          />

          <Section title="Partner and Operational Management" />

          <Row
            purpose="Collaborating with carriers for service delivery"
            basis="Performance of a contract; Legitimate interest"
          />
          <Row
            purpose="Managing contracts with vendors"
            basis="Performance of a contract"
          />

          <Section title="Recruitment" />

          <Row
            purpose="Processing job applications"
            basis="Performance of a contract; Legitimate interest"
          />
          <Row purpose="Maintaining a talent pool" basis="Consent" />

          <Section title="Security and Compliance" />

          <Row
            purpose="Preventing fraud and prohibited items"
            basis="Legal obligation; Legitimate interest"
          />
          <Row
            purpose="Ensuring network and data security"
            basis="Legal obligation; Legitimate interest"
          />
          <Row
            purpose="Complying with regulatory audits"
            basis="Legal obligation"
          />
        </tbody>
      </table>
    </div>
  );
};

const Section = ({ title }: { title: string }) => (
  <tr>
    <td className="border border-black p-3 font-bold bg-gray-100">{title}</td>
    <td className="border border-black bg-gray-100" />
  </tr>
);

const Row = ({ purpose, basis }: { purpose: string; basis: string }) => (
  <tr>
    <td className="border border-black p-3">{purpose}</td>
    <td className="border border-black p-3">{basis}</td>
  </tr>
);

const PrivacyPolicy = () => {
  return (
    <div className="py-6 md:my-10 my-5 lg:px-20 px-10 flex flex-col md:space-y-8 space-y-6">
      <p>Last Updated: December 20, 2025</p>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Introduction</h2>
        <p>
          At GoSendEet, we prioritize your trust by handling your personal
          information with the highest standards of care and transparency. Our
          goal is to deliver seamless parcel shipping solutions while
          safeguarding your privacy. This Privacy Policy outlines how we
          collect, use, store, share, and protect your data, the reasons behind
          these actions, and your rights under applicable laws.
        </p>
        <p>
          We are committed to complying with the Nigeria Data Protection
          Regulation (NDPR) 2019 and other relevant data protection frameworks,
          ensuring your data is processed responsibly and securely.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Scope of this Privacy Policy</h2>
        <p>
          This Privacy Policy covers all individuals interacting with our
          platform, website (gosendeet.vercel.app), mobile apps, or services
          worldwide, unless a separate policy applies to a specific feature or
          region.
        </p>
        <p>It applies to:</p>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            {" "}
            <span className="font-semibold">Senders:</span> Individuals or
            businesses initiating shipments, including their staff.
          </li>
          <li>
            <span className="font-semibold">Recipients:</span> Individuals
            receiving parcels.
          </li>
          <li>
            <span className="font-semibold">Users and Customers:</span> Those
            inquiring about, booking, or paying for our services.
          </li>
          <li>
            <span className="font-semibold">Partners:</span> Logistics carriers,
            vendors, or affiliates working with us, including their employees.
          </li>
          <li>
            <span className="font-semibold">Job Applicants:</span> Candidates
            applying for roles at GoSendEet.
          </li>
        </ul>
        <p>We refer to all these as "you" or "your" throughout this policy.</p>
        <p>
          Our practices align with local laws in the regions we operate,
          including Nigeria and any international jurisdictions where shipments
          occur. We only process data as permitted by these laws.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may update this policy to reflect changes in our services, data
          handling practices, or legal requirements. Updates will be posted here
          with the new "Last Updated" date. We encourage you to review it
          regularly.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Who is Responsible</h2>
        <p>
          GoSendEet acts as the data controller, deciding how and why your data
          is processed. For global operations, we may collaborate with
          affiliates, but GoSendEet Limited remains the primary controller.
        </p>

        <p>
          If you have questions, contact our Data Protection Officer (DPO) at
          dpo@gosendeet.com.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Types of Data We Process</h2>
        <p>
          We only collect data essential for our services or required by law. In
          Nigeria and other regions, additional data may be processed for
          compliance.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <p>
          Details to reach you for bookings, updates, or support. <br />
          Examples: Name, email, phone number, postal address.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          Account and Authentication Data
        </h2>
        <p>
          Information for secure access to your profile. <br />
          Examples: Username, password, security questions.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Shipment Details</h2>
        <p>
          Data needed to process, track, and deliver parcels. <br />
          Examples: Origin/destination addresses, parcel weight/dimensions,
          contents description, tracking numbers.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          Payment and Financial Information
        </h2>
        <p>
          Details for billing and transactions.
          <br />
          Examples: Bank details, card information (processed securely via
          third-party gateways), transaction history.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Profile and Preference Data</h2>
        <p>
          Custom settings to enhance your experience. <br />
          Examples: Delivery preferences, booking history, saved addresses.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          Identification Verification Data
        </h2>
        <p>
          Proof to confirm identity for security or legal reasons. <br />
          Examples: National ID, driver's license number (where required for
          high-value shipments).
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          Interaction and Feedback Data
        </h2>
        <p>Records from communications or surveys.</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Technical and Usage Data</h2>
        <p>
          Automatically collected for site functionality.
          <br />
          Examples: IP address, browser type, device info, cookies.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Employment Application Data</h2>
        <p>
          For recruitment purposes.
          <br />
          Examples: CV, qualifications, references.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Why We Collect Your Data</h2>

        <p>
          We process data only for defined purposes with a valid legal basis
          under NDPR and similar laws: performance of a contract, legal
          obligations, legitimate interests (balanced against your rights), or
          consent (which you can withdraw anytime).
        </p>
        <p>Here's a breakdown:</p>
        <LawfulBasisTable />
        <p>
          We balance legitimate interests by assessing impacts on your privacy
          and only proceeding if benefits outweigh risks.
        </p>
      </div>
      <h2 className="text-xl font-bold mb-2">
        Specific Data Processing Activities
      </h2>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Website and App Usage</h2>
        <p>
          When you visit our site or app, we log basic data (e.g., IP, visit
          duration) to maintain functionality and security. This is based on
          legitimate interest; data is deleted when no longer needed.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Parcel Verification</h2>
        <p>
          We review shipment details to ensure accuracy, value, and legal
          compliance, preventing restricted items (e.g., hazardous goods). This
          protects our network and is a legitimate interest.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Undeliverable Parcels</h2>
        <p>
          If delivery fails (e.g., invalid address), we may inspect packaging to
          find return details, based on contract performance.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Restricted Party Checks</h2>
        <p>
          We screen against government lists for sanctioned entities to avoid
          illegal shipments. If flagged, we may request ID verification; you can
          object.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Feedback Collection</h2>
        <p>
          We or partners may survey you to improve services, based on consent or
          legitimate interest.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Payment Processing</h2>
        <p>
          We use secure gateways for transactions, complying with financial
          standards.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Cookies and Tracking</h2>
        <p>
          Essential cookies enable core functions; others (e.g., analytics)
          require consent via our preference center.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Location Services</h2>
        <p>
          With consent, we use geolocation for tracking or finding drop-off
          points.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">How We Collect Your Data</h2>
        <p>
          We gather data directly (e.g., when you book a shipment or create an
          account) or indirectly (e.g., from senders providing recipient
          details). Indirect providers must ensure accuracy and lawful transfer.
        </p>
        <p>For partners, data is collected as needed for contracts.</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Information for Our Partners</h2>
        <p>
          We process partner data to fulfill agreements, such as carrier
          integrations for rate comparisons. Sharing is limited to essentials,
          with safeguards under NDPR.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">How Long We Keep Your Data</h2>
        <p>
          Retention is minimized: Data is kept only as long as needed for
          purposes, contracts, or laws (e.g., up to 7 years for financial
          records under Nigerian tax laws). Shipment data may be retained for
          3-5 years for disputes. Consent-based data is deleted upon withdrawal.
        </p>
        <p>We regularly review and delete unnecessary data.</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">How We Secure Your Data</h2>
        <p>
          We employ advanced measures: encryption, firewalls, access controls,
          and regular audits aligned with ISO 27001 principles. Employee
          training and incident response plans minimize risks. Physical security
          protects our facilities.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Will Your Data Be Shared</h2>
        <p>Sharing is limited to necessities, with safeguards:</p>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            <span className="font-semibold">Affiliates:</span> For internal
            operations.
          </li>
          <li>
            <span className="font-semibold">Carriers and Partners:</span> To
            execute shipments (e.g., pickup/delivery).
          </li>
          <li>
            <span className="font-semibold">Service Providers:</span> For IT,
            payments, or analytics (bound by contracts).
          </li>
          <li>
            <span className="font-semibold">Authorities:</span> As required by
            law (e.g., customs).
          </li>
        </ul>
        <p>
          International transfers (e.g., to England carriers) use NDPR-approved
          mechanisms like adequacy decisions or standard clauses.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">We Respect Your Rights</h2>
        <p>Under NDPR, you have rights (subject to conditions):</p>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            <span className="font-semibold">Access:</span> View your data and
            processing details.
          </li>
          <li>
            <span className="font-semibold">Rectification:</span> Correct
            inaccuracies.
          </li>
          <li>
            <span className="font-semibold">Erasure:</span> Delete data in
            certain cases.
          </li>
          <li>
            <span className="font-semibold">Restriction:</span> Limit
            processing.
          </li>
          <li>
            <span className="font-semibold">Portability:</span> Receive your
            data in a transferable format.
          </li>
          <li>
            <span className="font-semibold">Objection:</span> Challenge
            legitimate interest processing.
          </li>
          <li>
            <span className="font-semibold">Withdraw Consent:</span> Anytime,
            without affecting prior processing.
          </li>
          <li>
            <span className="font-semibold">Automated Decisions:</span> Review
            any automated profiling (none currently with significant effects).
          </li>
        </ul>
        <p>
          This policy ensures transparency—{" "}
          <a href="mailto:support@gosendeet.com" className="underline">
            contact us
          </a>{" "}
          for clarifications.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
