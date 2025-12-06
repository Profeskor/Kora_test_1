import svgPaths from "./svg-6if5y4wt7m";
import imgImageWithFallback from "figma:asset/8e3476fc29c802a2e8b95a923c5f6ee91e5f295d.png";

function ImageWithFallback() {
  return (
    <div className="absolute h-[39.989px] left-[147.34px] top-[23.99px] w-[79.124px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[28.003px] items-start left-[19.98px] top-[87.98px] w-[333.835px]" data-name="Heading 1">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[20px] text-center text-white">Welcome</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[39.969px] left-[19.98px] top-[123.98px] w-[333.835px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[167.05px] text-[#9f9fa9] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[261px]">Sign in to view exclusive Kora projects and available units.</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[189.242px] relative shrink-0 w-[373.804px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1.302px] border-solid border-zinc-800 inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[189.242px] relative w-[373.804px]">
        <ImageWithFallback />
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[19.537px] items-start left-0 top-[1.3px] w-[67.524px]" data-name="Bold Text">
      <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[22.75px] relative shrink-0 text-[#51a2ff] text-[14px] text-nowrap whitespace-pre">New user?</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[68.257px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#51a2ff] text-[14px] top-[-1.7px] w-[287px]">{`Click "Try Demo Account" below to explore the app instantly, or create a new account to get started.`}</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[rgba(43,127,255,0.1)] box-border content-stretch flex flex-col h-[102.853px] items-start left-[19.98px] pb-[1.302px] pt-[17.298px] px-[17.298px] rounded-[14px] top-[23.99px] w-[333.835px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.302px] border-[rgba(43,127,255,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[47.947px] left-[3.99px] rounded-[8px] top-[3.99px] w-[161.626px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[80.99px] text-[#71717b] text-[14px] text-center text-nowrap top-[11.98px] translate-x-[-50%] whitespace-pre">{`Email & Password`}</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-zinc-800 h-[47.947px] left-[165.62px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[3.99px] w-[161.626px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[81.62px] text-[14px] text-center text-nowrap text-white top-[11.98px] translate-x-[-50%] whitespace-pre">Mobile + OTP</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-black border-[1.302px] border-solid border-zinc-800 h-[58.529px] left-[19.98px] rounded-[10px] top-[150.84px] w-[333.835px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex h-[19.985px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#9f9fa9] text-[14px]">Mobile Number</p>
    </div>
  );
}

function PhoneInput() {
  return (
    <div className="bg-black h-[58.59px] relative rounded-[14px] shrink-0 w-full" data-name="Phone Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[58.59px] items-center p-[16px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#52525c] text-[16px] text-nowrap whitespace-pre">+971 50 123 4567</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.302px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9.992px] h-[88.567px] items-start left-0 top-0 w-[333.835px]" data-name="Container">
      <Label />
      <PhoneInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[19.985px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#9f9fa9] text-[14px]">OTP Code</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-black h-[58.59px] relative rounded-[14px] shrink-0 w-[333.835px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[58.59px] items-center overflow-clip p-[16px] relative rounded-[inherit] w-[333.835px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#52525c] text-[16px] text-nowrap whitespace-pre">Enter OTP</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.302px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-zinc-800 h-[58.59px] relative rounded-[14px] shrink-0 w-[333.835px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.302px] border-solid border-zinc-700 inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58.59px] relative w-[333.835px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[167.21px] text-[16px] text-center text-nowrap text-zinc-300 top-[15.6px] translate-x-[-50%] whitespace-pre">Send OTP</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[11.987px] h-[129.167px] items-start relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Button2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9.992px] h-[159.143px] items-start left-0 top-[108.55px] w-[333.835px]" data-name="Container">
      <Label1 />
      <Container4 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[43.998px] left-[200.07px] top-[275.69px] w-[133.766px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[67.49px] text-[#e0c99f] text-[14px] text-center text-nowrap top-[10.01px] translate-x-[-50%] whitespace-pre">Forgot password?</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[130.65px] size-[15.996px] top-[22.24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_22_470)" id="Icon">
          <path d={svgPaths.p1dca0700} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33298" />
          <path d={svgPaths.p391f6950} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33298" />
        </g>
        <defs>
          <clipPath id="clip0_22_470">
            <rect fill="white" height="15.9957" width="15.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#e0c99f] h-[55.985px] left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(123,51,6,0.5),0px_4px_6px_-4px_rgba(123,51,6,0.5)] top-[351.68px] w-[333.835px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[178.65px] text-[16px] text-black text-center text-nowrap top-[14.3px] translate-x-[-50%] whitespace-pre">Sign In</p>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute h-[407.668px] left-[19.98px] top-[233.36px] w-[333.835px]" data-name="Form">
      <Container3 />
      <Container5 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute border-[#e0c99f] border-[1.302px] border-solid h-[58.59px] left-[19.98px] rounded-[14px] top-[725px] w-[333.835px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[165.72px] text-[#e0c99f] text-[16px] text-center text-nowrap top-[14.3px] translate-x-[-50%] whitespace-pre">Try Demo Account</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute box-border content-stretch flex h-[15.996px] items-start left-[19.98px] px-[16px] py-0 top-[799.58px] w-[333.835px]" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#71717b] text-[12px] text-center">Quick access with pre-loaded demo data</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute border-[1.302px] border-solid border-zinc-800 h-[58.59px] left-[19.98px] rounded-[14px] top-[839.57px] w-[333.835px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[165.41px] text-[16px] text-center text-nowrap text-zinc-300 top-[14.3px] translate-x-[-50%] whitespace-pre">Create New Account</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute border-[1.302px] border-solid border-zinc-800 h-[58.59px] left-[19.98px] rounded-[14px] top-[914.16px] w-[333.835px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[165.93px] text-[#9f9fa9] text-[16px] text-center text-nowrap top-[14.3px] translate-x-[-50%] whitespace-pre">Continue as Guest</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute box-border content-stretch flex h-[15.996px] items-start left-[19.98px] px-[16px] py-0 top-[988.74px] w-[333.835px]" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#52525c] text-[12px] text-center">Browse available inventory only</p>
    </div>
  );
}

function Container6() {
  return <div className="absolute border-[1.302px_0px_0px] border-solid border-zinc-800 h-[1.302px] left-0 top-[9.34px] w-[333.835px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="absolute bg-zinc-900 box-border content-stretch flex h-[19.985px] items-start left-[144.39px] px-[16px] py-0 top-0 w-[45.057px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#52525c] text-[14px] text-nowrap whitespace-pre">or</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[19.985px] left-[19.98px] top-[673.02px] w-[333.835px]" data-name="Container">
      <Container6 />
      <Text />
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[373.804px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[373.804px]">
        <Container1 />
        <Container2 />
        <Form />
        <Button5 />
        <Paragraph2 />
        <Button6 />
        <Button7 />
        <Paragraph3 />
        <Container7 />
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="bg-zinc-900 content-stretch flex flex-col h-[1241.97px] items-start overflow-clip relative shrink-0 w-full" data-name="LoginScreen">
      <Container />
      <Container8 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-black content-stretch flex flex-col h-[1241.97px] items-start overflow-clip relative shrink-0 w-full" data-name="App">
      <LoginScreen />
    </div>
  );
}

export default function OnboardingFlowDesign() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Onboarding Flow Design">
      <App />
    </div>
  );
}