import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons

const NavBar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#1d1d20] p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40%"
          height="40%"
          viewBox="0 0 111 24"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          role="img"
        >
          <path
            d="M0.800781 6.47742H13.7415"
            stroke={theme === "dark" ? "white" : "currentColor"}
            stroke-width="4.608"
          ></path>
          <path
            d="M16.9034 22.5799L16.9034 9.63922"
            stroke={theme === "dark" ? "white" : "currentColor"}
            stroke-width="4.608"
          ></path>
          <path
            d="M2.53925 20.898L11.8566 11.5807"
            stroke={theme === "dark" ? "white" : "currentColor"}
            stroke-width="4.608"
          ></path>
          <path
            d="M102.376 23.0414C100.75 23.0414 99.3341 22.675 98.1294 21.9422C96.9247 21.2093 95.991 20.2003 95.3284 18.9153C94.6759 17.6203 94.3496 16.1294 94.3496 14.4429C94.3496 12.7462 94.6859 11.2554 95.3586 9.97039C96.0312 8.67533 96.9698 7.67141 98.1745 6.95862C99.3793 6.2358 100.78 5.87439 102.376 5.87439C104.012 5.87439 105.433 6.24082 106.638 6.97368C107.842 7.70655 108.776 8.71549 109.439 10.0005C110.101 11.2855 110.432 12.7663 110.432 14.4429C110.432 16.1395 110.096 17.6353 109.423 18.9304C108.761 20.2154 107.822 21.2243 106.607 21.9572C105.403 22.68 103.992 23.0414 102.376 23.0414ZM102.376 19.849C103.872 19.849 104.986 19.347 105.719 18.3431C106.462 17.3392 106.833 16.0391 106.833 14.4429C106.833 12.8065 106.462 11.5014 105.719 10.5276C104.976 9.54372 103.862 9.0518 102.376 9.0518C101.362 9.0518 100.529 9.2827 99.8762 9.74451C99.2237 10.1963 98.7367 10.8287 98.4155 11.6419C98.1043 12.4451 97.9487 13.3787 97.9487 14.4429C97.9487 16.0893 98.3201 17.4044 99.063 18.3883C99.816 19.3621 100.92 19.849 102.376 19.849Z"
            fill={theme === "dark" ? "white" : "currentColor"}
          ></path>
          <path
            d="M86.3386 22.5891V5.90393C86.3386 5.49232 86.3486 5.04558 86.3687 4.56369C86.3988 4.08181 86.4841 3.60495 86.6247 3.13311C86.7753 2.66126 87.0313 2.22958 87.3927 1.83805C87.8244 1.35616 88.2962 1.01985 88.8082 0.829106C89.3303 0.628322 89.8423 0.517891 90.3442 0.497811C90.8462 0.467695 91.2979 0.452637 91.6995 0.452637H93.7475V3.22346H91.8501C91.1373 3.22346 90.6052 3.40417 90.2539 3.76558C89.9025 4.11695 89.7268 4.59883 89.7268 5.21122V22.5891H86.3386ZM83.6732 9.00605V6.32558H93.7475V9.00605H83.6732Z"
            fill={theme === "dark" ? "white" : "currentColor"}
          ></path>
          <path
            d="M73.8019 23.0414C72.1755 23.0414 70.76 22.675 69.5553 21.9422C68.3506 21.2093 67.4169 20.2003 66.7543 18.9153C66.1018 17.6203 65.7755 16.1294 65.7755 14.4429C65.7755 12.7462 66.1118 11.2554 66.7845 9.97039C67.4571 8.67533 68.3957 7.67141 69.6005 6.95862C70.8052 6.2358 72.2056 5.87439 73.8019 5.87439C75.4383 5.87439 76.8588 6.24082 78.0635 6.97368C79.2682 7.70655 80.2019 8.71549 80.8645 10.0005C81.527 11.2855 81.8583 12.7663 81.8583 14.4429C81.8583 16.1395 81.522 17.6353 80.8494 18.9304C80.1868 20.2154 79.2481 21.2243 78.0334 21.9572C76.8287 22.68 75.4182 23.0414 73.8019 23.0414ZM73.8019 19.849C75.2977 19.849 76.4121 19.347 77.1449 18.3431C77.8878 17.3392 78.2593 16.0391 78.2593 14.4429C78.2593 12.8065 77.8878 11.5014 77.1449 10.5276C76.402 9.54372 75.2877 9.0518 73.8019 9.0518C72.7879 9.0518 71.9547 9.2827 71.3021 9.74451C70.6496 10.1963 70.1626 10.8287 69.8414 11.6419C69.5302 12.4451 69.3746 13.3787 69.3746 14.4429C69.3746 16.0893 69.746 17.4044 70.4889 18.3883C71.2419 19.3621 72.3462 19.849 73.8019 19.849Z"
            fill={theme === "dark" ? "white" : "currentColor"}
          ></path>
          <path
            d="M59.8784 22.5897V14.6687C59.8784 14.1065 59.8332 13.5042 59.7429 12.8617C59.6525 12.2091 59.4668 11.5967 59.1857 11.0245C58.9146 10.4422 58.5181 9.97039 57.996 9.60898C57.474 9.24757 56.7813 9.06686 55.9179 9.06686C55.4059 9.06686 54.909 9.15219 54.4271 9.32286C53.9553 9.49353 53.5336 9.77463 53.1622 10.1662C52.7907 10.5476 52.4946 11.0697 52.2737 11.7323C52.0629 12.3848 51.9575 13.198 51.9575 14.1718L49.8944 13.3436C49.8944 11.918 50.1655 10.643 50.7076 9.51862C51.2597 8.38419 52.0528 7.49572 53.0869 6.85321C54.131 6.20066 55.4009 5.87439 56.8968 5.87439C58.0513 5.87439 59.015 6.06513 59.788 6.44662C60.5711 6.82811 61.1935 7.32506 61.6553 7.93745C62.1272 8.5398 62.4786 9.18733 62.7095 9.88004C62.9504 10.5727 63.111 11.2454 63.1913 11.8979C63.2717 12.5404 63.3118 13.0825 63.3118 13.5243V22.5897H59.8784ZM48.524 22.5897V6.32615H51.5509V11.1902H51.9575V22.5897H48.524Z"
            fill={theme === "dark" ? "white" : "currentColor"}
          ></path>
          <path
            d="M31.1127 22.5891V5.90393C31.1127 5.49232 31.1227 5.04558 31.1428 4.56369C31.1729 4.08181 31.2582 3.60495 31.3988 3.13311C31.5494 2.66126 31.8054 2.22958 32.1668 1.83805C32.5985 1.35616 33.0703 1.01985 33.5823 0.829106C34.1044 0.628322 34.6164 0.517891 35.1183 0.497811C35.6203 0.467695 36.072 0.452637 36.4736 0.452637H38.5216V3.22346H36.6242C35.9114 3.22346 35.3793 3.40417 35.028 3.76558C34.6766 4.11695 34.5009 4.59883 34.5009 5.21122V22.5891H31.1127ZM28.4473 9.00605V6.32558H42.1357V9.00605H28.4473ZM41.684 22.5891V6.32558H45.0722V22.5891H41.684Z"
            fill={theme === "dark" ? "white" : "currentColor"}
          ></path>
          <path
            d="M43.5061 3.61412C44.5041 3.61412 45.3132 2.80507 45.3132 1.80706C45.3132 0.809048 44.5041 0 43.5061 0C42.5081 0 41.699 0.809048 41.699 1.80706C41.699 2.80507 42.5081 3.61412 43.5061 3.61412Z"
            fill={theme === "dark" ? "white" : "currentColor"}
          ></path>
        </svg>{" "}
        <span className="text-black font-semibold dark:text-white mt-1.5 text-base lg:text-4xl">
          FRUITS
        </span>
        <button
          className="fixed top-4 right-4 bg-[#1d1d20] dark:bg-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleThemeSwitch}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;