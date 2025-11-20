import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const CareersPage = () => {
    const positions = [
        {
            title: "Delivery Logistics Coordinator",
            type: "Full-time",
            location: "Nairobi HQ",
            description: "Manage our growing fleet of delivery riders and ensure timely water delivery to our customers."
        },
        {
            title: "Quality Assurance Specialist",
            type: "Full-time",
            location: "Production Plant",
            description: "Oversee our filtration processes and ensure every drop meets KEBS and international standards."
        },
        {
            title: "Sales Representative",
            type: "Commission-based",
            location: "Remote / Field",
            description: "Expand our client base by onboarding new corporate and residential clients."
        }
    ];

    return (
        <div className="pt-24 pb-20 animate-fadeIn">
            {/* Header */}
            <div className="bg-salang-blue-900 text-white py-20 px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Join Our Mission</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Help us deliver purity and health to every household in Nairobi. We're looking for passionate individuals to join the Salang Water family.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Growth & Learning</h3>
                        <p className="text-slate-600 text-sm">Continuous training and clear career progression paths.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Impact</h3>
                        <p className="text-slate-600 text-sm">Work on initiatives that provide clean water to underserved communities.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Flexibility</h3>
                        <p className="text-slate-600 text-sm">Modern work culture that respects work-life balance.</p>
                    </div>
                </div>

                {/* Open Positions */}
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Open Positions</h2>
                <div className="space-y-6">
                    {positions.map((job, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                                    <span className="flex items-center"><Briefcase size={16} className="mr-1" /> {job.type}</span>
                                    <span className="flex items-center"><MapPin size={16} className="mr-1" /> {job.location}</span>
                                </div>
                                <p className="text-slate-600">{job.description}</p>
                            </div>
                            <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center p-10 bg-slate-50 rounded-3xl">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't see the right fit?</h3>
                    <p className="text-slate-600 mb-6">
                        We are always looking for talent. Send your CV to <a href="mailto:careers@salangwater.co.ke" className="text-blue-600 font-bold hover:underline">careers@salangwater.co.ke</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
