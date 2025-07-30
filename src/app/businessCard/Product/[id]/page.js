import { useRouter } from "next/navigation";

const ItemCard = ({ product }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/businessCard/Product/${product.id}`)}>
        <div className="card">
            hola
        </div>
    </div>
  );
};