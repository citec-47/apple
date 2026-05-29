import CartView from "@/components/CartView";

export const metadata = { title: "Your bag" };

export default function CartPage() {
  return (
    <div className="bg-white">
      <CartView />
    </div>
  );
}
