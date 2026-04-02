import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.returnUrl {
      return NextResponse.json(
        { error: "return Url is required" },
        { status: 400 },
      );
    }

    // ✅ auth check
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    // ✅ get user
    const user = await User.findOne({ email: session.user.email });

    // ✅ stripe init
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    // ✅ create checkout session
    const stripeCoustmerPortal = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
      customer_email: user.email,
    });

    return NextResponse.json({
      url: stripeCheckoutSession.url,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ validation
    if (!body.successUrl || !body.cancelUrl) {
      return NextResponse.json(
        { error: "Success and cancel URLs are required" },
        { status: 400 },
      );
    }

    // ✅ auth
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

// ✅ get user
const user = await User.findById(session.user.id);

// ✅ stripe init
const stripe = new Stripe(process.env.STRIPE_API_KEY);

// ✅ create billing portal session (THIS IS THE CHANGE)
const stripeCustomerPortal = await stripe.billingPortal.sessions.create({
  customer: user.customerId,
  return_url: body.returnUrl,
});

// ✅ return portal URL
return NextResponse.json({
  url: stripeCustomerPortal.url,
})
