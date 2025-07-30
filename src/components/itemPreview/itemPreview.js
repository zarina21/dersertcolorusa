import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ItemCard({ id, image, name, description }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/businessCard/Product/${id}`);
  };

  return (
    <div
      className="card has-text-centered itemPreview"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div className="card-image py-2">
        <figure className="image is-4by3">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="contain"
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-5 my-2">{name}</p>
        <p className="subtitle is-6">{description}</p>
      </div>
    </div>
  );
}