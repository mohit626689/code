import ButtonLogin from "../components/ButtonLogin";
import FAQListItem from "../components/FAQListItem";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <main>
      {/* header */}
      <section className="bg-violet-200 p-4 flex items-center justify-between max-w-6xl mx-auto">
        {/* logo */}
        <div className="font-extrabold">Ved Automation</div>

        {/* center nav */}
        <div className="hidden md:flex space-x-10">
          <a className="link link-hover" href="#pricing">
            pricing
          </a>
          <a className="link link-hover" href="#FAQ">
            FAQ
          </a>
        </div>

        {/* button */}
        <div className="py-7 font-extralight">
          <ButtonLogin session={session} />
        </div>
      </section>

      {/* hero */}
      <section className="py-16 p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <Image
          src="/productDemo.jpeg"
          alt="product Demo"
          width={400}
          height={300}
        />
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Start Your Journey Today With Me
          </h1>
          <h2>Automate your business workflows to work faster and smarter </h2>
          <p>
            {" "}
            Create powerful automations in minutes, connect your tools, and
            eliminate repetitive tasks so you can focus on growing your
            business.
          </p>

          <ButtonLogin session={session} extraStyle="mt-6" />
        </div>
      </section>

      <section>
        {/* PRICING */}

        <section className="bg-base-200" id="pricing">
          <div className="py-32 px-8 max-w-3xl mx-auto">
            <p className=" uppercase text-primary text font-extrabold text-xl py-6 text-center">
              Pricing
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
              A pricing that adapts to your needs
            </h2>
            <div className="p-8 bg-base-100 w-96 rounded-3xl mx-auto">
              <div className="flex gap-2 items-baseline">
                <div className="text-4xl font-black">$19</div>
                <div className="uppercase text-sm font-medium opacity-60">
                  /month
                </div>
              </div>

              <ul className="mt-2 space-y-2">
                <li className="flex gap-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 bg-green-200 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  Collect customer feedback
                </li>
                <li className="flex gap-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 bg-green-200 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  Unlimited boards
                </li>
                <li className="flex gap-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 bg-green-200 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  Admin dashboard
                </li>
                <li className="flex gap-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 bg-green-200 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  24/7 support
                </li>
                <ButtonLogin session={session} extraStyle="w-full" />
              </ul>
            </div>
          </div>
        </section>
      </section>

      {/* FAQ */}
      <section className="bg-base-200" id="FAQ">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className=" uppercase text-primary text font-extrabold text-xl py-6 text-center">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <ul className="max-w-lg mx-auto">
            {[
              {
                question: "What do I get exactly?",
                answer:
                  "You get access to Ved Automation tools and workflows designed to automate repetitive business tasks. This includes automation for data collection, lead management, workflow integrations, and dashboards that help you save time and increase productivity. Our goal is to help businesses reduce manual work and run operations more efficiently.",
              },
              {
                question: "Can I get a refund?",
                answer:
                  "Yes. If you are not satisfied with the service, you can request a refund within the refund period specified in our policy. We aim to provide reliable automation solutions, but if the product does not meet your expectations, our support team will help resolve the issue or process the refund.",
              },
              {
                question: "I have another question",
                answer:
                  "No problem. If you have additional questions about Ved Automation, features, integrations, or pricing, you can contact our support team. We are happy to help you understand how automation can improve your workflow.",
              },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
