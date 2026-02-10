import { loadStripe } from "@stripe/stripe-js";

// This would normally be handled by a backend service
// For this demo, we'll simulate the checkout flow
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_sample");

export async function createCheckoutSession(planId: string) {
    console.log(`Creating Stripe checkout session for ${planId}...`);
    // Simulate delay
    await new Promise(r => setTimeout(r, 1500));
    return { url: `/dashboard/billing?status=success&plan=${planId}` };
}
