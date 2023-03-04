import Link from "next/link";

const ProjectDiv = ({
  createdBy,
  members,
  tags,
  name,
  desc,
  enrolled,
  projectId,
}) => {
  return (
    <div className="flex flex-col gap-y-4 rounded-md bg-primaryYellow p-6">
      <div className="flex justify-between">
        <div className="flex gap-x-3 items-center">
          <h1 className="text-lg font-semibold">{name}</h1>
          {tags?.map((tag, idx) => {
            return (
              <h1 key={idx} className="tagClass">
                {tag}
              </h1>
            );
          })}
        </div>
        <div>
          <h1 className=" text-primaryOrange">{createdBy.name}</h1>
        </div>
      </div>
      <p className="text-sm font-extralight w-3/4 text-gray-600">{desc}</p>
      <div className="flex justify-between w-full items-center">
        <Link
          href={
            enrolled ? `project/?id=${projectId}` : `startProject/${projectId}`
          }
          className="actionButton"
        >
          <h1>{enrolled ? "Go to Project" : "Start Project"}</h1>
        </Link>

        <div className="flex max-w-1/4 flex-wrap gap-x-2">
          {members.length > 0 && (
            <h1 className="text-primaryOrange">Members: </h1>
          )}
          {members?.map((member, idx) => {
            return (
              <h1 key={idx} className="text-primaryOrange">
                {member.name}
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectDiv;
