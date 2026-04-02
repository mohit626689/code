import { headers } from "next/headers";
// import Stripe from "stripe"; ❌ disabled
import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";

export async function POST(req) {
  try {
    // 1. Verify the webhook event (dummy for now)

    // const stripe = new Stripe(process.env.STRIPE_API_KEY); ❌

    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // ❌ Stripe disabled → fake event
    const event = {
      type: "checkout.session.completed",
      data: {
        object: {
          client_reference_id: "dummy_user_id",
          customer: "dummy_customer_id",
        },
      },
    };

    const { data, type } = event;

    if (type === "checkout.session.completed") {
      // ✅ Grant access to the product

      await connectMongo();

      const user = await User.findById(data.object.client_reference_id);

      await user.save();
    } else if (type === "customer.subscription.deleted") {
      // ❌ Revoke access to the product (subscription cancelled or non-payment)

      await connectMongo();

      const user = await User.findOne({
        customerId: data.object.customer,
      });

      user.hasAccess = false;

      await user.save();
    }
  } catch (e) {
    console.error("Stripe error: " + e?.message);
  }

  return NextResponse.json({});
}
