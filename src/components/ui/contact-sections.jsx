import { Globe, Twitter, ArrowRight } from "lucide-react";

const contactMethods = [
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Join our community",
        desc: "Come hang out, ask questions, and collaborate with other developers.",
        link: {
            name: "Join our Discord",
            href: "javascript:void(0)",
        },
    },
    {
        icon: <Twitter className="w-6 h-6" />,
        title: "Follow us on Twitter",
        desc: "Stay up to date with the latest news, tips, and updates from our team.",
        link: {
            name: "Send us DMs",
            href: "javascript:void(0)",
        },
    },
];

export default function ContactSections() {
    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8 lg:flex">
                <div className="max-w-md">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Let's connect
                    </h3>
                    <p className="mt-3">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                </div>
                <div>
                    <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
                        {contactMethods.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                            >
                                <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700">
                                    {item.icon}
                                </div>
                                <h4 className="text-gray-800 text-lg font-medium xl:text-xl">
                                    {item.title}
                                </h4>
                                <p>{item.desc}</p>
                                <a
                                    href={item.link.href}
                                    className="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                                >
                                    {item.link.name}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
