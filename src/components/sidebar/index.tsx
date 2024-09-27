import React, { useState } from "react";
import CrossLogo from "../../assests/cross_logo.svg";
import Image from "next/image";
import SearchInput from "../input/search";
import { chatDataAtom, bookmarkAtom, historyAtom, loadingAtom } from "@/atoms";
import { useAtom } from "jotai";
import { postMessage } from "@/services/api/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { groupByDate } from "@/utils/helpers";
import cx from "classnames";
import { useSmallScreen } from "@/services/api/common";
import ConfirmModal from "@/components/ConfirmModal";
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

type DeleteContext = {
  type: "bookmark" | "history" | null;
  index: number | null;
};

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("History");
  const [history, setHistory] = useAtom(historyAtom);
  const [chatData, setChatData] = useAtom(chatDataAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [bookmarks, setBookmarks] = useAtom(bookmarkAtom);
  const router = useRouter();
  const pathName = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const isSmallScreen = useSmallScreen();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteContext, setDeleteContext] = useState<DeleteContext>({
    type: null,
    index: null,
  });

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setSearchQuery("");
  };

  const handleSearchInputChange = (input: string) => {
    setSearchQuery(input);
  };

  const handleToggleSidebar = () => {
    setSearchQuery("");
    toggleSidebar();
  };

  const handlePost = async (message: string) => {
    setLoading(true);
    if (!loading) {
      if (pathName !== "/chat") {
        await router.push("/chat");
      }
      if (isSmallScreen) {
        toggleSidebar();
      }

      const timestamp = new Date().toISOString();

      setHistory((prev) => {
        const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
        return [...prev, { id: lastId + 1, value: message, timestamp }];
      });
      

      setChatData((prev) => ({
        ...prev,
        searchValues: [...prev.searchValues, message],
      }));

      const onContentReceived = (newContent: string) => {
        setChatData((prevData) => {
          const lastResponseIndex = prevData.responses.length - 1;

          return {
            ...prevData,
            responses: prevData.responses.map((response, index) =>
              index === lastResponseIndex
                ? { ...response, content: response.content + newContent }
                : response
            ),
          };
        });
      };

      const onParsedChunkReceived = (parsedChunkData: any) => {
        const sources = parsedChunkData?.sources || [];

        setChatData((prevChatData) => ({
          ...prevChatData,
          responses: [
            ...prevChatData.responses,
            { sources, content: "", timestamp: new Date().toISOString() },
          ],
        }));
      };

      try {
        await postMessage(message, onContentReceived, onParsedChunkReceived);
      } catch (error) {
        console.error("Error during postData call:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const groupedHistory = groupByDate(history);
  

  const filteredHistory = Object.entries(groupedHistory).reduce(
    (acc, [dateLabel, values]) => {
      const filteredValues = values.filter(({ value }) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredValues.length > 0) {
        acc[dateLabel] = filteredValues;
      }
  
      return acc;
    },
    {} as Record<string, { id: number; value: string }[]>
  );
  

  const handleConfirmDelete = () => {
    const { type, index } = deleteContext;
    if (type && index !== null) {
      if (type === "history") {
        setHistory((prev) => prev.filter((item) => item.id !== index));
      } else if (type === "bookmark") {
        setBookmarks((prev) => prev.filter((_, i) => i !== index));
      }
      setDeleteModalOpen(false);
      setDeleteContext({ type: null, index: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeleteContext({ type: null, index: null });
  };

  const openDeleteModal = (type: "bookmark" | "history", index: number) => {
    setDeleteContext({ type, index });
    setDeleteModalOpen(true);
  };

  return (
    <div
      className={cx(
        "absolute hide-scrollbar z-30 lg:z-0 lg:static w-full rounded-lg lg:w-[20rem] h-full bg-custom-purple text-white transform transition-transform duration-300 ease-in-out pt-[30px] pl-[10px] pb-[10px] pr-[10px]",
        {
          "translate-x-0 flex flex-col": isSidebarOpen,
          "-translate-x-full hidden": !isSidebarOpen,
        }
      )}
      style={{ height: "99vh", overflowY: "scroll" }}
    >
      <div className="flex flex-col gap-[20px]">
        <button className="text-white z-10 focus:outline-none">
          <Image
            onClick={handleToggleSidebar}
            src={CrossLogo}
            alt="Cross_logo"
          />
        </button>

        <div className="rounded-[12px] p-[4px] gap-[10px] h-[56px] flex items-center bg-[#0D121C]">
          <div
            onClick={() => handleTabClick("History")}
            className={cx(
              "cursor-pointer lg:w-[121px] w-[50%] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center font-roboto text-[16px] font-[500] rounded-[12px] border transition-all duration-300",
              {
                "bg-[#1F0E3C] border-custom-purple-border":
                  activeTab === "History",
                "bg-[#0D121C] border-transparent": activeTab !== "History",
              }
            )}
          >
            History
          </div>
          <div
            onClick={() => handleTabClick("Bookmark")}
            className={cx(
              "cursor-pointer w-[50%] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center text-[16px] font-normal rounded-[12px] border transition-all duration-300",
              {
                "bg-[#1F0E3C] border-custom-purple-border":
                  activeTab === "Bookmark",
                "bg-[#0D121C] border-transparent": activeTab !== "Bookmark",
              }
            )}
          >
            Bookmark
          </div>
        </div>
        <SearchInput value={searchQuery} onChange={handleSearchInputChange} />

        {activeTab === "History" && (
          <div className="flex flex-col gap-2">
            {Object.keys(filteredHistory).length > 0 ? (
              Object.entries(filteredHistory).map(
                ([dateLabel, values], index) => (
                  <div
                    className="flex cursor-pointer flex-col gap-[10px]"
                    key={index}
                  >
                    <span className="text-[15px] text-[rgba(169,60,255,1)] font-[500] font-roboto rounded-[6px] bg-[#222337] shadow-custom-inset p-[4px_10px_4px_10px] border border-[rgba(255,255,255,0.08)]">
                      {dateLabel}
                    </span>
                    {values
                      .slice()
                      .reverse()
                      .map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          className="px-1 py-1.5 flex gap-1 justify-between rounded-lg text-white"
                        >
                          <p
                            onClick={() => handlePost(value.value)}
                            className="md:text-xs text-base cursor-pointer text-[rgba(242,244,247,1)] font-[500] tracking-[-0.34px] leading-[120%] font-roboto"
                          >
                            {value.value}
                          </p>
                          <svg
                            onClick={() =>
                              openDeleteModal(
                                "history",
                                value.id
                              )
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="md:size-4 md:min-w-4 size-5 min-w-5 z-10"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9L14.394 18M9.606 18L9.26 9M19.228 5.79C19.57 5.842 19.91 5.897 20.25 5.956M19.228 5.79L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79M19.228 5.79a48.108 48.108 0 00-3.478-.397M4.772 5.79c.34-.059.68-.114 1.022-.165M5.794 5.79a48.11 48.11 0 013.478-.397M14.794 5.393V4.477C14.794 3.297 13.884 2.313 12.704 2.276a51.964 51.964 0 00-3.32 0C8.204 2.313 7.294 3.297 7.294 4.477v.916"
                            />
                          </svg>
                        </div>
                      ))}
                  </div>
                )
              )
            ) : (
              <p className="text-[14px] text-center text-[rgba(255,255,255,0.60)]">
                No search history available.
              </p>
            )}
          </div>
        )}

        {activeTab === "Bookmark" && (
          <div className="flex flex-col">
            {bookmarks.filter((bookmark) =>
              bookmark.toLowerCase().includes(searchQuery.toLowerCase())
            ).length > 0 ? (
              bookmarks
                .filter((bookmark) =>
                  bookmark.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((bookmark, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-[15px] flex flex-col gap-[5px] rounded-lg text-white"
                  >
                    <div className="flex gap-[5px] items-center justify-between">
                      <p
                        onClick={() => handlePost(bookmark)}
                        className="md:text-xs"
                      >
                        {index + 1}. {bookmark}
                      </p>
                      <svg
                        onClick={() => openDeleteModal("bookmark", index)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="md:size-4 md:min-w-4 size-5 min-w-5 z-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9L14.394 18M9.606 18L9.26 9M19.228 5.79C19.57 5.842 19.91 5.897 20.25 5.956M19.228 5.79L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79M19.228 5.79a48.108 48.108 0 00-3.478-.397M4.772 5.79c.34-.059.68-.114 1.022-.165M5.794 5.79a48.11 48.11 0 013.478-.397M14.794 5.393V4.477C14.794 3.297 13.884 2.313 12.704 2.276a51.964 51.964 0 00-3.32 0C8.204 2.313 7.294 3.297 7.294 4.477v.916"
                        />
                      </svg>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-[14px] text-center text-[rgba(255,255,255,0.60)]">
                No bookmarks available.
              </p>
            )}
          </div>
        )}
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Sidebar;
