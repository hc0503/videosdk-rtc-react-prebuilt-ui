import { appThemes } from "../../../MeetingAppContextDef";
import { SingleRow } from "./VirtualBackgroundContainer";

const LGDesktopBackgroundSection = ({ videoProcessor, appTheme }) => {
  const LGDesktopArr = [
    {
      imageUrl:
        appTheme === appThemes.DARK
          ? `${process.env.PUBLIC_URL}/VirtualBackground/no-filter-dark.png`
          : appTheme === appThemes.LIGHT
          ? `${process.env.PUBLIC_URL}/VirtualBackground/no-filter-light.png`
          : `${process.env.PUBLIC_URL}/VirtualBackground/No-filter.png`,
      displayImageUrl: "",
    },
    {
      imageUrl:
        appTheme === appThemes.DARK
          ? `${process.env.PUBLIC_URL}/VirtualBackground/blur-dark.png`
          : appTheme === appThemes.LIGHT
          ? `${process.env.PUBLIC_URL}/VirtualBackground/blur-light.png`
          : `${process.env.PUBLIC_URL}/VirtualBackground/Blur.png`,
      displayImageUrl: "",
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-1.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-1.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-2.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-2.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-3.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-3.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-4.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-4.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-5.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-5.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-6.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-6.jpg`,
    },
  ];

  const LGDesktopArr2 = [
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-7.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-7.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-8.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-8.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-9.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-9.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-10.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-10.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-11.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-11.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-12.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-12.jpg`,
    },
    {
      imageUrl: `${process.env.PUBLIC_URL}/VirtualBackground/image-13.png`,
      displayImageUrl: `${process.env.PUBLIC_URL}/bgImages/image-13.jpg`,
    },
    { imageUrl: "" },
  ];

  return (
    <>
      <SingleRow
        arr={LGDesktopArr}
        blur={true}
        videoProcessor={videoProcessor}
        topSpacing={false}
      />
      <SingleRow
        arr={LGDesktopArr2}
        videoProcessor={videoProcessor}
        topSpacing={true}
      />
    </>
  );
};

export default LGDesktopBackgroundSection;
