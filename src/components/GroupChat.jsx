import { db } from "../../firebase";
import { setDoc, getDoc, doc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
const GroupChats = ({ projectId }) => {
  const [groupChats, setGroupChats] = useState([]);
  const [uid, setUid] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUid(user.uid);
  }, []);
  const fetchMsg = async () => {
    const chats = await getDoc(doc(db, "groupChats", `${projectId}_Chats`));
    setGroupChats(chats?.data()?.chats);

    setIsChatLoaded(true);
  };

  const getProjectName = async () => {
    const project = await getDoc(doc(db, "projects", projectId));
    setProjectName(project.data().name);
  };

  const addMsg = async () => {
    const uid = JSON.parse(localStorage.getItem("user")).uid;

    const user = await getDoc(doc(db, "userProfiles", uid));
    const userName = user.data().name;

    const docRef = doc(db, "groupChats", `${projectId}_Chats`);
    await setDoc(
      docRef,
      {
        chatId: `${projectId}_Chats`,
        chats: arrayUnion({
          from: {
            name: userName,
            uid,
          },
          type: "text",
          text: newMsg,
          time: new Date().getTime(),
        }),
      },
      { merge: true }
    );
    setNewMsg("");
    fetchMsg();
  };

  useEffect(() => {
    setInterval(() => {
      fetchMsg();
    }, 100);
    getProjectName();
  }, []);
  return (
    <div className="h-[80vh] md:h-[600px]  overflow-y-auto w-full flex flex-col justify-between ">
      <div className="sticky top-0 pl-2 py-2 border-b border-black bg-primaryYellow ">
        <h1>Project Name: {projectName}</h1>
      </div>
      <div className="flex flex-col gap-y-2 w-full pr-10 px-4  py-3 flex-grow">
        {groupChats?.length > 0 &&
          groupChats?.map((chat, idx) => {
            return (
              <div
                key={idx}
                className={`w-full max-w-1/4 flex break-all p-2 flex-col ${
                  chat?.from?.uid === uid && "items-end"
                }`}
              >
                <p className="text-sm text-gray-600 font-extralight">
                  {chat?.from?.name}
                </p>
                <p
                  className={`w-fit  ${
                    chat?.from?.uid === uid
                      ? "actionButton rounded-md"
                      : "actionButton rounded-md bg-white text-black"
                  }`}
                >
                  {chat?.text}
                </p>
              </div>
            );
          })}
        {isChatLoaded && (groupChats?.length === 0 || !groupChats) && (
          <div className=" flex flex-col gap-y-3 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/noChat.svg" alt="no chat" />
            <h1 className="text-textHeading text-2xl font-bold">
              Nothing here
            </h1>
            <h1 className="text-primaryOrange font-semibold">
              There&apos;s no chat in your feed
            </h1>
          </div>
        )}
      </div>

      <div className="flex sticky bottom-0 pl-2 gap-x-3 mx-2 py-2 pr-10 border border-primaryOrange rounded-full bg-primaryYellow">
        <input
          type="text"
          placeholder="Type here..."
          value={newMsg}
          className="flex-grow outline-none bg-transparent"
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button disabled={!newMsg} onClick={addMsg} className="px-2">
          <RiSendPlaneFill className="text-primaryOrange " />
        </button>
      </div>
    </div>
  );
};

export default GroupChats;
