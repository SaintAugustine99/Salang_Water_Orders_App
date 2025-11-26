import React, { useState } from 'react';
import { X, MapPin, CreditCard, Mail, User, Phone } from 'lucide-react';
import LocationPicker from './LocationPicker';
import { sendOrderEmail } from '../utils/email';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: any[];
    totalAmount: number;
    onPaymentSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, totalAmount, onPaymentSuccess }) => {
    const [step, setStep] = useState<'details' | 'location' | 'payment'>('details');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: { lat: 0, lng: 0, address: '' }
    });
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleNext = () => {
        if (step === 'details') {
            if (!formData.name || !formData.email || !formData.phone) {
                alert('Please fill in all fields');
                return;
            }
            setStep('location');
        } else if (step === 'location') {
            if (formData.location.lat === 0) {
                alert('Please pin your location on the map');
                return;
            }
            setStep('payment');
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        // 1. Simulate M-Pesa Payment (or use real API if available)
        // In a real app, this would call your backend
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 2. Send Email
        try {
            await sendOrderEmail({
                to_name: formData.name,
                to_email: formData.email,
                order_id: `ORD-${Date.now()}`,
                order_items: cart.map(item => `${item.qty}x ${item.name}`).join(', '),
                total_amount: `KES ${totalAmount}`,
                delivery_address: `Lat: ${formData.location.lat}, Lng: ${formData.location.lng}`,
                phone: formData.phone
            });
        } catch (error) {
            console.error("Email failed but payment succeeded", error);
        }

        setIsProcessing(false);
        onPaymentSuccess();
        onClose();
        alert('Order Placed Successfully! Check your email for confirmation.');
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold font-serif">Checkout</h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Steps Indicator */}
                    <div className="flex items-center justify-between px-4">
                        <div className={`flex flex-col items-center ${step === 'details' ? 'opacity-100' : 'opacity-60'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'details' || step === 'location' || step === 'payment' ? 'bg-white text-blue-600 font-bold' : 'bg-blue-400'}`}>1</div>
                            <span className="text-xs">Details</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-blue-400 mx-2"></div>
                        <div className={`flex flex-col items-center ${step === 'location' || step === 'payment' ? 'opacity-100' : 'opacity-60'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'location' || step === 'payment' ? 'bg-white text-blue-600 font-bold' : 'bg-blue-800 text-blue-200'}`}>2</div>
                            <span className="text-xs">Location</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-blue-400 mx-2"></div>
                        <div className={`flex flex-col items-center ${step === 'payment' ? 'opacity-100' : 'opacity-60'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'payment' ? 'bg-white text-blue-600 font-bold' : 'bg-blue-800 text-blue-200'}`}>3</div>
                            <span className="text-xs">Payment</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {step === 'details' && (
                        <div className="space-y-4 animate-fadeIn">
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Contact Information</h3>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-slate-50"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-slate-50"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Phone Number (M-Pesa)</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="tel"
                                        placeholder="0712345678"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-slate-50"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'location' && (
                        <div className="space-y-4 animate-fadeIn">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">Pin Delivery Location</h3>
                            <p className="text-sm text-slate-500 mb-4">Click on the map to pin your exact delivery location.</p>

                            <LocationPicker onLocationSelect={(loc) => setFormData({ ...formData, location: { ...loc, address: loc.address || '' } })} />

                            {formData.location.lat !== 0 && (
                                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
                                    <MapPin size={16} />
                                    Location pinned: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="space-y-6 animate-fadeIn">
                            <h3 className="font-bold text-lg text-slate-800">Order Summary</h3>

                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-slate-600">{item.qty}x {item.name}</span>
                                        <span className="font-medium">KES {item.price * item.qty}</span>
                                    </div>
                                ))}
                                <div className="h-[1px] bg-slate-200 my-2"></div>
                                <div className="flex justify-between font-bold text-lg text-slate-900">
                                    <span>Total</span>
                                    <span>KES {totalAmount}</span>
                                </div>
                            </div>

                            <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-blue-900">M-Pesa Payment</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            A prompt will be sent to <strong>{formData.phone}</strong>. Please enter your PIN to complete the transaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                    {step !== 'details' && (
                        <button
                            onClick={() => setStep(step === 'payment' ? 'location' : 'details')}
                            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Back
                        </button>
                    )}

                    {step === 'payment' ? (
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>Pay KES {totalAmount}</>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
                        >
                            Next Step
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
