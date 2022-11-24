import Tag from "./Tag";

export default function Movie({ name, tags }) {
  return (
    <div>
      Le film s'appelle {name}
      {tags.map((tag) => (
        <Tag id={tag.id} name={tag.name} />
      ))}
    </div>
  );
}
