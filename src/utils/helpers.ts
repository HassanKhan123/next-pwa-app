import { isToday, isYesterday, differenceInDays } from 'date-fns';

export const groupByDate = (history: { value: string; timestamp: string }[]) => {
    const grouped: { [key: string]: string[] } = {};
  
    history.forEach(({ value, timestamp }) => {
      let responseDate;
      try {
        responseDate = new Date(timestamp);
      } catch (e) {
        responseDate = new Date();
      }
  
      const today = new Date();
      let groupLabel: string;
  
      if (isToday(responseDate)) {
        groupLabel = "Today";
      } else if (isYesterday(responseDate)) {
        groupLabel = '1 day dgo';
      } else {
        const daysAgo = differenceInDays(today, responseDate);
        groupLabel = isNaN(daysAgo) ? "Today" : `${daysAgo} days ago`;
      }
  
      if (!grouped[groupLabel]) {
        grouped[groupLabel] = [];
      }
      grouped[groupLabel].push(value);
    });
  
    const sortedGroupedEntries = Object.entries(grouped).sort(([a], [b]) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      if (a === '1 day ago') return -1;
      if (b === '1 day ago') return 1;
      const aDays = parseInt(a.split(" ")[0]);
      const bDays = parseInt(b.split(" ")[0]);
      return aDays - bDays;
    });
  
    return Object.fromEntries(sortedGroupedEntries);
  };


  export const truncateText = (text: string, maxLength: number) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
  
    // Truncate URLs in the text
    const truncatedText = text.replace(urlRegex, (url) => {
      return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
    });
  
    // Check if the overall text length exceeds maxLength after truncating URLs
    if (truncatedText.length > maxLength) {
      return truncatedText.slice(0, maxLength) + '...';
    }
  
    return truncatedText;
  };
  