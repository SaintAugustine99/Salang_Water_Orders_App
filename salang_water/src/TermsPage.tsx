import React from 'react';

const TermsPage = () => {
    return (
        <div className="pt-24 pb-20 animate-fadeIn">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Terms and Conditions</h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-6">Last Updated: November 2025</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Welcome to Salang Water. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Orders and Delivery</h2>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Orders are subject to availability and acceptance by Salang Water.</li>
                            <li>Delivery times are estimates and may vary based on location and traffic conditions.</li>
                            <li>We reserve the right to cancel orders if delivery to your location is not feasible.</li>
                            <li>You must ensure someone is available to receive the delivery at the specified address.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Bottle Exchange Policy</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            For refill orders, you must provide an empty bottle of the same brand and size in good condition.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Bottles must be clean and free from cracks or contamination.</li>
                            <li>We reserve the right to reject bottles that do not meet our quality standards.</li>
                            <li>If you do not have an exchange bottle, you must purchase a new bottle (New User package).</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payments</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We accept M-Pesa and Cash on Delivery. M-Pesa payments must be completed before delivery is finalized. All prices are inclusive of VAT.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Privacy Policy</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We collect your personal information (name, phone, address) solely for the purpose of fulfilling your orders. We do not share your data with third parties without your consent, except as required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at <a href="mailto:support@salangwater.co.ke" className="text-blue-600 hover:underline">support@salangwater.co.ke</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
