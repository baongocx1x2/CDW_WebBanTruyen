// src/components/VerifyAccount.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface LocationState {
    email: string;
}

const VerifyAccount: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state as LocationState;

    const [verificationCode, setVerificationCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [resendCooldown, setResendCooldown] = useState<number>(0);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api.post('/auth/verify', {
                email,
                verificationCode,
            });
            navigate('/login');
        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Xác nhận thất bại. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        // Nếu đang ở cooldown, không cho gửi lại
        if (resendCooldown > 0) return;

        try {
            await api.post('/auth/resend', null, { params: { email } });
            // Sau khi gửi thành công, set cooldown 60 giây
            setResendCooldown(60);
        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Gửi lại mã thất bại. Vui lòng thử lại.');
            }
        }
    };

    // Sử dụng useEffect để giảm dần cooldown mỗi giây
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-center text-gray-800">
                        Xác nhận tài khoản
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Vui lòng nhập mã xác nhận đã được gửi vào email của bạn.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleVerify} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="verificationCode" className="sr-only">
                                Mã xác nhận
                            </label>
                            <input
                                id="verificationCode"
                                name="verificationCode"
                                type="text"
                                required
                                placeholder="Nhập mã xác nhận"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300
                           placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500
                           focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex-1 justify-center py-2 px-4 border border-transparent
                         text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Đang xác nhận...' : 'Xác nhận'}
                        </button>
                        {/* Nút gửi lại mã */}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendCooldown > 0}
                            className="ml-4 group relative flex-1 justify-center py-2 px-4 border border-transparent
                         text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {resendCooldown > 0 ? `Gửi lại mã (${resendCooldown}s)` : 'Gửi lại mã'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyAccount;