"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      value: "dovydasjusevicius@gmail.com",
      href: "mailto:dovydasjusevicius@gmail.com"
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone",
      value: "+370 67614600",
      href: "tel:+37067614600"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Location",
      value: "Kaunas, Lithuania",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-6">
            I'm always open to discussing new opportunities, collaborating on exciting projects, or connecting with fellow innovators. Feel free to reach out.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg" isPressable radius="lg">
              <CardBody className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="text-indigo-400 mb-4">
                        {info.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {info.title}
                      </h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-lg"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-300 text-lg">{info.value}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;