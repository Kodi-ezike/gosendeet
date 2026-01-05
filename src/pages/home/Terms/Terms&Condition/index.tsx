const TermsConditions = () => {
  return (
    <div className="py-6 md:my-10 my-5 lg:px-20 px-10 flex flex-col md:space-y-8 space-y-6">
      <p>Last Updated: December 20, 2025</p>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          1. Introduction and Acceptance of Terms
        </h2>
        <p>
          Welcome to GoSendEet (the "Platform" or "Website" at
          gosendeet.vercel.app), operated by [GoSendEet] Limited**, "we", "us",
          "our", or "GoSendEet").
        </p>
        <p>
          These Terms of Service ("Terms") govern your access to and use of our
          website, mobile applications (if any), and all associated services
          (collectively, the "Services"). The Services include parcel shipping
          comparison tools, direct booking options, rate comparisons from
          multiple carriers, scheduling of pickups, label generation, payment
          processing, and real-time tracking.
        </p>
        <p>
          By accessing, browsing, or using the Services (including obtaining
          quotes or booking shipments), you acknowledge that you have read,
          understood, and agree to be bound by these Terms, our Privacy Policy,
          and any additional guidelines or rules applicable to specific
          features. If you do not agree, you must not use the Services.
        </p>
        <p>
          We reserve the right to update these Terms at any time. Changes will
          be posted on the Website with the updated "Last Updated" date. Your
          continued use of the Services after changes constitutes acceptance of
          the revised Terms.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">2. Description of Services</h2>
        <p>
          GoSendEet acts as an intermediary platform connecting users with
          third-party carriers for parcel shipping within Nigeria and globally.
        </p>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            {" "}
            <span className="font-semibold">Compare Mode:</span> We provide
            real-time quotes and comparisons from over 50 partnered carriers
            based on your provided shipment details (origin, destination,
            weight, dimensions, etc.).
          </li>
          <li>
            <span className="font-semibold">Direct Mode:</span> We offer our
            branded shipping service for simplified, doorstep-to-doorstep
            delivery.
          </li>
        </ul>
        <p>
          Additional value added services and features include but are not
          limited to optional insurance, flexible pickup/drop-off scheduling,
          secure payments, label generation, and live GPS tracking with
          notifications.
        </p>
        <p>
          We do not physically handle, transport, or store parcels. The contract
          of carriage is formed directly between you and the selected carrier
          (or us in Direct Mode where applicable).
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          3. Eligibility and Account Registration
        </h2>
        <p>
          You must be at least 18 years old and capable of forming a binding
          contract to use the Services. By registering, you represent and
          warrant that you meet these requirements.
        </p>
        <p>
          To access certain features (e.g., booking, tracking history), you must
          create an account with accurate information. You are responsible for
          maintaining the security of your account credentials and for all
          activities occurring under your account. Notify us immediately at
          <a href="mailto:support@gosendeet.com" className="underline">
            support@gosendeet.com
          </a>{" "}
          of any unauthorized use or issues you may have with your account as
          soon as possible. Our team will respond as soon as possible to
          understand the situation and advise you the most feasible SLA timeline
          for resolution
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          4. User Obligations and Responsibilities
        </h2>
        <p>You agree to:</p>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            Provide accurate, complete, and up-to-date information for all
            shipments (e.g., addresses, parcel weight/dimensions, contents
            description, value).
          </li>
          <li>
            Package parcels securely in accordance with carrier guidelines and
            our Packaging Advice (available during booking).
          </li>
          <li>
            Ensure parcels comply with all applicable laws, including customs
            declarations if required.
          </li>
          <li>
            Print and correctly attach shipping labels (or use label-free
            options where offered).
          </li>
          <li>
            Be present (or arrange for someone) at pickup addresses during
            scheduled times, or use drop-off points.
          </li>
          <li>
            Inform recipients of relevant customs duties, charges or taxes where
            and when applicable .
          </li>
        </ul>
        <p>
          You are solely responsible for the contents of your parcels, proper
          packaging, and any consequences of inaccuracies or non-compliance.
          Gosendeet reserves the right to escalate any suspicious dealings to
          relevant law enforcements and regulatory authorities
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2"> 5. Regulatory Matters</h2>
        <p>
          All parcels received by GoSendEet are subject to being opened for
          controlled inspection as they make their way to you in and out of
          Nigeria. Edible items, furniture and other goods imported or exported
          may attract additional government levies including NAFDAC and Customs
          charges. Importation of items containing lithium batteries for
          instance will attract additional charges as they need to be handled as
          dangerous goods.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          6. Prohibited and Restricted Items
        </h2>
        <p>
          We and our carriers prohibit or restrict certain items for safety,
          legal, or operational reasons. Prohibited items include (but are not
          limited to):
        </p>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            Dangerous goods (e.g., explosives, flammables, radioactive
            materials)
          </li>
          <li>Illegal substances, weapons, or counterfeit goods</li>
          <li>Live animals, human remains, or perishables</li>
          <li>High-value items exceeding carrier limits without declaration</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          7. Pricing, Payments, and Additional Charges
        </h2>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            The Platform is free to use; you pay only the selected shipping rate
            (plus any optional extras like insurance).
          </li>
          <li>
            Quotes are based on your provided details and are subject to
            verification.
          </li>
          <li>
            Payments are processed securely via third-party providers (e.g.,
            Stripe or similar). We do not store full card details.
          </li>
          <li>
            Additional charges may apply from carriers for discrepancies (e.g.,
            overweight/oversize parcels, incorrect addresses, failed
            collections, remote area surcharges). These will be billed to your
            payment method.
          </li>
        </ul>
        <p>All prices include VAT where applicable.</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          8. Insurance, Claims, and Liability
        </h2>
        <p></p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          9. Intellectual Property and Website Use
        </h2>
        <p>
          All content, logos, software, and designs on the Platform are owned by
          us or our licensors. You may not copy, modify, distribute, or
          reverse-engineer without permission from an authorised signatory of
          the company.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          10. Termination and Suspension
        </h2>
        <p>
          We may suspend or terminate your access for breaches of these Terms,
          suspected fraud, or non-payment of charges at any time without any due
          notice.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">
          11. Governing Law and Dispute Resolution
        </h2>
        <p>
          These Terms of Service and any dispute or claim (including
          non-contractual disputes or claims) arising out of or in connection
          with them, their subject matter, or formation shall be governed by and
          construed in accordance with the laws of the Federal Republic of
          Nigeria.
        </p>
        <p>
          You irrevocably agree that the courts of Lagos State, Nigeria shall
          have exclusive jurisdiction to settle any dispute or claim arising out
          of or in connection with these Terms or the Services. For our sole
          benefit, nothing in this clause shall limit our right to initiate
          proceedings against you in any other court of competent jurisdiction
          (including the courts where you are domiciled or where any assets are
          located), nor shall the commencement of proceedings in one
          jurisdiction preclude us from commencing proceedings in any other
          jurisdiction, whether concurrently or not, to the extent permitted by
          the law of such jurisdiction.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">12. Miscellaneous</h2>
        <ul className="list-disc ml-4 space-y-2">
          <li>
            Force Majeure: We are not liable for failures due to events beyond
            our control.
          </li>
          <li>
            Severability: If any provision is invalid, the remainder remains in
            effect.
          </li>
          <li>
            Contact: For questions, email{" "}
            <a href="mailto:support@gosendeet.com" className="underline">
              support@gosendeet.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsConditions;
