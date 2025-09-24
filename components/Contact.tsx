"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      value: "dovydasjusevicius@gmail.com",
      href: "mailto:dovydasjusevicius@gmail.com"
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone",
      value: "+370 67614600",
      href: "tel:+37067614600"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Location",
      value: "Kaunas, Lithuania",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, collaborating on exciting projects, 
            or simply connecting with fellow engineers and innovators.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl" isPressable radius="lg">
              <CardHeader>
                <h3 className="text-2xl font-bold text-gray-100">Contact Information</h3>
              </CardHeader>
              <CardBody className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg"
                  >
                    <div className="text-indigo-400">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100 mb-1">
                        {info.title}
                      </h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-300">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-600/30 rounded-xl" isPressable radius="lg">
              <CardBody className="p-6 text-center">
                <h4 className="text-lg font-semibold text-gray-100 mb-2">
                  Let's Build Something Amazing Together
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Whether you have a project in mind, want to collaborate, or just want to chat about 
                  engineering and innovation, I'd love to hear from you!
                </p>
                <a 
                  href="https://thunderclaplabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 text-sm inline-block"
                >
                  Visit ThunderClap Labs →
                </a>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;