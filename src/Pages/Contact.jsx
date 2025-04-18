import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-3xl border border-white/20"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    👋 Hey there!
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Let’s get in touch. Drop a message below.
                </p>

                <form className="space-y-6">
                    <div className="relative">
                        <FiUser className="absolute top-3.5 left-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div className="relative">
                        <FiMail className="absolute top-3.5 left-4 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div className="relative">
                        <FiMessageCircle className="absolute top-3.5 left-4 text-gray-500" />
                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        🚀 Send Message
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;
