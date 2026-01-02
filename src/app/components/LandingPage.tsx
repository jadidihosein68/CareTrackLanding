import { useEffect, useState, type SVGProps } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { Calendar, Bell, BookOpen, Heart, CheckCircle, Smartphone, Turtle } from 'lucide-react';
import geico from '../assets/geico.webp';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';

type IconProps = SVGProps<SVGSVGElement>;

const SnakeIcon = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path d="M6 36c6-10 18-10 24 0s18 10 28 0" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="58" cy="36" r="2" />
    <path d="M60 36l4 2-4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GeckoIcon = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path
      d="M22 34c2-8 10-14 20-12 8 2 12 8 12 14 0 8-8 14-18 14-8 0-14-4-16-10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 36c-10 2-16 10-12 18 2 4 8 4 12 2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="42" cy="24" r="2" />
    <path d="M30 24l-8-6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38 24l8-6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 44l-8 8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 44l8 8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="22" cy="18" r="2" />
    <circle cx="50" cy="18" r="2" />
    <circle cx="20" cy="52" r="2" />
    <circle cx="52" cy="52" r="2" />
  </svg>
);

const SpiderIcon = (props: IconProps) => (
  <svg viewBox="0 0 213 169" fill="none" preserveAspectRatio="xMidYMid meet" {...props}>
    <g className="spider-animated">
      <path
        d="M0 0 C5.87763251 0.34731465 8.6117866 2.75202017 12.75 6.5625 C13.97812683 7.65351539 15.20730055 8.74335343 16.4375 9.83203125 C17.03820313 10.36908691 17.63890625 10.90614258 18.2578125 11.45947266 C20.70499267 13.62338898 23.21092736 15.69438451 25.75 17.75 C26.52859375 18.38421875 27.3071875 19.0184375 28.109375 19.671875 C29.88767702 21.19160772 29.88767702 21.19160772 32 21 C33.30696338 19.44221518 33.30696338 19.44221518 34.625 17.4375 C40.96851293 8.7858655 48.87986908 3.10373029 59.3671875 0.38671875 C72.91251217 -1.60287642 86.48195163 -0.10000639 98 7.6875 C102.80621006 11.45721572 106.07363226 15.66586133 109 21 C113.88754174 19.48412709 117.01332367 16.6513863 120.75 13.3125 C121.99253322 12.23067143 123.23602256 11.14994001 124.48046875 10.0703125 C125.65376893 9.04701612 126.82695499 8.02358888 128 7 C129.67227206 5.54481319 131.35694958 4.10353682 133.0625 2.6875 C133.71347656 2.13449219 134.36445313 1.58148438 135.03515625 1.01171875 C137.77026814 -0.39661918 139.10225491 0.08359565 142 1 C143.72583008 2.7590332 143.72583008 2.7590332 145.26953125 5.05078125 C145.84437256 5.88883301 146.41921387 6.72688477 147.01147461 7.59033203 C147.60581299 8.48864746 148.20015137 9.38696289 148.8125 10.3125 C149.74171265 11.67930908 149.74171265 11.67930908 150.68969727 13.07373047 C152.47466548 15.70620224 154.24009935 18.3507266 156 21 C156.81457411 22.21519922 157.62959254 23.43010089 158.4453125 24.64453125 C159.72046516 26.55225964 160.98695144 28.4658272 162.2421875 30.38671875 C163.47104885 32.21362596 164.75205167 34.00604648 166.0703125 35.76953125 C166.72773438 36.64996094 167.38515625 37.53039062 168.0625 38.4375 C168.65160156 39.19933594 169.24070313 39.96117187 169.84765625 40.74609375 C171.30091079 43.5885611 170.92304728 45.00932683 170 48 C167.81640625 47.90234375 167.81640625 47.90234375 165 47 C163.09221958 44.8812486 161.53520063 42.89671462 159.9375 40.5625 C159.47214844 39.90596436 159.00679687 39.24942871 158.52734375 38.57299805 C153.25838517 31.08032174 148.22561804 23.42199987 143.1953125 15.76806641 C142.23311633 14.3448179 141.20436511 12.96668604 140.15625 11.60546875 C139 10 139 10 139 8 C138.00033203 8.81791016 138.00033203 8.81791016 136.98046875 9.65234375 C135.0418407 11.23849398 133.10302535 12.82441531 131.1640625 14.41015625 C129.09451044 16.1032518 127.02721119 17.79898721 124.9609375 19.49609375 C123.52621094 20.67365234 123.52621094 20.67365234 122.0625 21.875 C121.18722656 22.59429687 120.31195313 23.31359375 119.41015625 24.0546875 C117 26 117 26 114.74609375 27.4453125 C112.47292457 29.46929759 112.47777594 31.06291643 112 34 C115.08354148 31.72944919 118.16679656 29.45850979 121.25 27.1875 C122.12269531 26.54490234 122.99539062 25.90230469 123.89453125 25.24023438 C125.16103516 24.30727539 125.16103516 24.30727539 126.453125 23.35546875 C127.22817383 22.78465576 128.00322266 22.21384277 128.80175781 21.62573242 C131.01634858 20.04188818 131.01634858 20.04188818 132.97167969 18.2277832 C135 17 135 17 137.51342773 16.96533203 C140.99919061 18.41576532 141.89624773 20.31106688 143.78515625 23.5546875 C144.29255089 24.4085051 144.29255089 24.4085051 144.81019592 25.27957153 C145.9095248 27.13621656 146.98600843 29.00503755 148.0625 30.875 C149.18953526 32.79574711 150.32165256 34.71343341 151.45422363 36.63092041 C152.21189431 37.9144323 152.96767099 39.1990641 153.72155762 40.48480225 C157.49333302 46.89912707 161.52410134 53.14244162 165.68383789 59.31201172 C166.14137451 60.01342285 166.59891113 60.71483398 167.0703125 61.4375 C167.47008301 62.03433594 167.86985352 62.63117188 168.28173828 63.24609375 C169.2095473 65.51168858 168.7916429 66.73282443 168 69 C166.68 69.33 165.36 69.66 164 70 C161.3438242 66.78160212 159.0074283 63.55099264 156.86328125 59.97265625 C156.28980957 59.02156982 155.71633789 58.0704834 155.12548828 57.09057617 C154.52720215 56.09131104 153.92891602 55.0920459 153.3125 54.0625 C148.50983777 46.09008069 143.62194168 38.20470846 138.4765625 30.44921875 C137 28 137 28 137 26 C131.51761013 28.98253536 126.5473942 32.37606767 121.5625 36.125 C120.46518555 36.93130859 120.46518555 36.93130859 119.34570312 37.75390625 C118.65541016 38.27082031 117.96511719 38.78773437 117.25390625 39.3203125 C116.62814697 39.78711426 116.0023877 40.25391602 115.35766602 40.73486328 C114.68562134 41.36110596 114.68562134 41.36110596 114 42 C114 42.66 114 43.32 114 44 C114.51908936 43.72212646 115.03817871 43.44425293 115.57299805 43.15795898 C117.93699959 41.90304729 120.31184713 40.67020191 122.6875 39.4375 C123.91243164 38.78104492 123.91243164 38.78104492 125.16210938 38.11132812 C126.35610352 37.49741211 126.35610352 37.49741211 127.57421875 36.87109375 C128.30213623 36.48880615 129.03005371 36.10651855 129.7800293 35.71264648 C132.67871317 34.7821221 134.15595567 34.91152095 137 36 C138.73828125 38.15112305 138.73828125 38.15112305 140.3125 41.01171875 C140.90740234 42.06979736 141.50230469 43.12787598 142.11523438 44.21801758 C143.04819336 45.93541138 143.04819336 45.93541138 144 47.6875 C144.98389065 49.46101284 145.97292969 51.23158824 146.96228027 53.00205994 C147.63624692 54.20916117 148.30818739 55.41739579 148.97814941 56.62672424 C151.19917203 60.62318939 153.51518147 64.54709479 155.90625 68.4453125 C156.81503906 69.93285034 156.81503906 69.93285034 157.7421875 71.45043945 C158.89351577 73.32502575 160.0546422 75.19363761 161.2265625 77.05541992 C161.73960937 77.89951416 162.25265625 78.7436084 162.78125 79.61328125 C163.23564453 80.34329346 163.69003906 81.07330566 164.15820312 81.82543945 C165.22293227 84.57588681 164.8008421 86.2089918 164 89 C161.7109375 88.80859375 161.7109375 88.80859375 159 88 C157.2890625 85.97265625 157.2890625 85.97265625 155.625 83.0625 C155.14994019 82.24845703 155.14994019 82.24845703 154.6652832 81.41796875 C153.90329107 80.1060622 153.14963345 78.78929847 152.40185547 77.46923828 C150.7037244 74.47813803 148.97895515 71.50299953 147.25390625 68.52734375 C144.0181362 62.94259604 140.79975948 57.34812467 137.59057617 51.74804688 C136.08627736 49.14906186 134.55258952 46.57036891 133 44 C128.32115961 45.42087484 124.07311174 47.37185278 119.75 49.625 C113.26785714 53 113.26785714 53 111 53 C110.690625 54.27875 110.38125 55.5575 110.0625 56.875 C106.84610727 66.37457852 99.43795736 72.36838238 90.7734375 76.84375 C84.14309795 79.6079479 78.282243 80.35925504 71.1875 80.3125 C70.29820801 80.30686035 69.40891602 80.3012207 68.49267578 80.29541016 C57.12247306 80.08465764 47.57487342 76.94808587 38.9921875 69.18359375 C35.75423343 65.71435724 33.72787059 62.48690193 31.9765625 58.0859375 C28.91239434 51.82033937 24.43286824 49.93354575 18.1875 47.375 C17.20845703 46.94316406 16.22941406 46.51132813 15.22070312 46.06640625 C12.82481 45.01455073 10.4202544 43.99418719 8 43 C7.73517822 43.70850098 7.47035645 44.41700195 7.19750977 45.14697266 C5.94233882 48.13737584 4.46557634 50.84271133 2.83984375 53.6484375 C2.21513184 54.73012207 1.59041992 55.81180664 0.94677734 56.92626953 C-1.75187841 61.55825145 -4.45068359 66.19012431 -7.15576172 70.81835938 C-8.73737514 73.54692518 -10.28663283 76.28906985 -11.81640625 79.046875 C-12.58593276 80.40625268 -13.35546355 81.76562795 -14.125 83.125 C-14.61818726 84.04611572 -14.61818726 84.04611572 -15.12133789 84.98583984 C-16.0703125 86.6328125 -16.0703125 86.6328125 -18 89 C-20.7421875 89.3671875 -20.7421875 89.3671875 -23 89 C-23.94070056 86.48429794 -24.13935331 85.35494831 -23.14233398 82.81542969 C-22.68157471 82.02555664 -22.22081543 81.23568359 -21.74609375 80.421875 C-20.96842651 79.06787598 -20.96842651 79.06787598 -20.17504883 77.68652344 C-19.31496216 76.23294434 -19.31496216 76.23294434 -18.4375 74.75 C-17.85701904 73.74743164 -17.27653809 72.74486328 -16.6784668 71.71191406 C-15.43996205 69.57684641 -14.19571327 67.44510233 -12.94628906 65.31640625 C-10.98102767 61.96767183 -9.03171301 58.61008857 -7.0859375 55.25 C-4.66380839 51.0744486 -2.23830991 46.90095863 0.19921875 42.734375 C0.69252686 41.89100586 1.18583496 41.04763672 1.6940918 40.17871094 C2.74698822 38.42211201 3.86398393 36.70402411 5 35 C10.56472574 35.56002831 14.9267939 37.6345243 19.875 40.0625 C21.050625 40.62807617 21.050625 40.62807617 22.25 41.20507812 C24.16995053 42.12993234 26.085439 43.06403978 28 44 C24.87119578 39.6462026 21.4143002 36.87402774 17.0625 33.875 C16.45470703 33.44574219 15.84691406 33.01648438 15.22070312 32.57421875 C11.89077558 30.2393181 8.51954022 28.043604 5 26 C4.6690332 26.5669458 4.33806641 27.1338916 3.99707031 27.71801758 C-4.35677465 42.0037824 -12.81756041 56.22634061 -22 70 C-23.65 69.67 -25.3 69.34 -27 69 C-27.25124496 65.12116759 -26.77459031 63.02442351 -24.68359375 59.76171875 C-24.17352783 58.95259033 -23.66346191 58.14346191 -23.13793945 57.30981445 C-22.29622192 56.0117688 -22.29622192 56.0117688 -21.4375 54.6875 C-20.25244291 52.82041484 -19.06755418 50.95322282 -17.8828125 49.0859375 C-16.93970215 47.61205566 -16.93970215 47.61205566 -15.97753906 46.10839844 C-13.91741095 42.87018225 -11.88856876 39.61409276 -9.8671875 36.3515625 C-9.19115479 35.26141846 -8.51512207 34.17127441 -7.81860352 33.0480957 C-6.4955639 30.9141972 -5.17312199 28.779928 -3.85131836 26.64526367 C-3.24682861 25.67564697 -2.64233887 24.70603027 -2.01953125 23.70703125 C-1.21672729 22.41502808 -1.21672729 22.41502808 -0.39770508 21.09692383 C1 19 1 19 3 17 C7.77752064 17.1676323 10.82202881 19.85329022 14.375 22.75 C15.52145612 23.6597109 16.66858614 24.5685732 17.81640625 25.4765625 C18.36312988 25.91258789 18.90985352 26.34861328 19.47314453 26.79785156 C22.23917825 28.97564977 25.11366237 30.98627607 28 33 C27.76926734 29.33464695 27.09232631 28.09447344 24.48046875 25.421875 C23.39381123 24.51786307 22.29538908 23.62786327 21.1875 22.75 C20.61233643 22.27908936 20.03717285 21.80817871 19.44458008 21.32299805 C13.76217189 16.70958078 7.91178868 12.31400796 2 8 C1.73517822 8.72509766 1.47035645 9.45019531 1.19750977 10.19726562 C-0.01058155 13.0247658 -1.41644591 15.31600896 -3.16015625 17.84375 C-3.785271 18.75495605 -4.41038574 19.66616211 -5.05444336 20.60498047 C-5.71710205 21.56033691 -6.37976074 22.51569336 -7.0625 23.5 C-7.73482666 24.47727051 -8.40715332 25.45454102 -9.09985352 26.46142578 C-11.06180957 29.31093899 -13.03010543 32.15597116 -15 35 C-15.99764491 36.44514059 -16.99507208 37.89043153 -17.9921875 39.3359375 C-19.98904681 42.22796696 -21.99191047 45.11575217 -24 48 C-25.65 47.67 -27.3 47.34 -29 47 C-29.62231445 45.1965332 -29.62231445 45.1965332 -30 43 C-28.48372959 40.56367728 -26.95986286 38.42447966 -25.1875 36.1875 C-24.15996524 34.84197375 -23.13529412 33.49425651 -22.11328125 32.14453125 C-21.59072754 31.45697754 -21.06817383 30.76942383 -20.52978516 30.06103516 C-18.19135175 26.91053167 -16.02678646 23.65468726 -13.875 20.375 C-9.35383735 13.50876098 -4.70612471 6.74089844 0 0 Z "
        fill="currentColor"
        transform="translate(35,55)"
      />
      <path
        d="M0 0 C1.98 0 3.96 0 6 0 C6.64757625 1.43671568 7.29299453 2.87440416 7.9375 4.3125 C8.29714844 5.11300781 8.65679687 5.91351563 9.02734375 6.73828125 C10 9 10 9 11 12 C12.32 9.03 13.64 6.06 15 3 C22.59 3 30.18 3 38 3 C41 10 41 10 41 13 C41.66 13 42.32 13 43 13 C43.18175781 12.09507813 43.18175781 12.09507813 43.3671875 11.171875 C43.53476563 10.37265625 43.70234375 9.5734375 43.875 8.75 C44.03742188 7.96109375 44.19984375 7.1721875 44.3671875 6.359375 C44.99150075 4.03168856 45.84838542 2.10968048 47 0 C48.98 0 50.96 0 53 0 C54 3 54 3 53.3203125 5.015625 C49.55790069 12.04863009 44.64512582 17.05749284 37.20703125 20.16796875 C30.05842688 22.02260058 20.15981029 22.56026772 13.375 19.3125 C11.59765625 18.19140625 11.59765625 18.19140625 10 17 C8.948125 16.2575 7.89625 15.515 6.8125 14.75 C3.57157399 11.58109457 0.69810461 8.24948567 -1 4 C-0.62890625 1.75390625 -0.62890625 1.75390625 0 0 Z "
        fill="#ffffff"
        fillOpacity="0.35"
        transform="translate(79,100)"
      />
      <g className="spider-eye">
        <path
          d="M0 0 C3.22916644 2.75428902 4.89144202 4.87044941 5.41015625 9.18359375 C5.57951194 14.13908844 5.53459478 17.93261628 2.125 21.8125 C-1.69458324 25.16910345 -5.53156571 25.38048612 -10.43359375 25.234375 C-15.1116499 24.4260069 -17.42719412 21.72097138 -20.25 18 C-21.71295646 12.87965237 -21.56092776 9.15895078 -19.1875 4.5 C-13.8978859 -1.64738936 -7.55008721 -3.11851428 0 0 Z "
          fill="#ffffff"
          fillOpacity="0.4"
          transform="translate(101.875,70.1875)"
        />
        <path
          d="M0 0 C4.55555556 0.55555556 4.55555556 0.55555556 6 2 C6.1875 4.4375 6.1875 4.4375 6 7 C5.34 7.66 4.68 8.32 4 9 C0.70285207 8.67028521 -0.6226839 8.3773161 -3 6 C-2.63318342 3.06546739 -2.13562754 2.13562754 0 0 Z "
          fill="currentColor"
          transform="translate(97,82)"
        />
      </g>
      <g className="spider-eye">
        <path
          d="M0 0 C3.02508145 1.73602105 5.41790069 3.83580137 7 7 C7.68128376 13.81283762 7.68128376 13.81283762 5.953125 16.82421875 C2.82207185 20.62752744 1.13366332 21.88663367 -3.75 22.375 C-7.10058068 22.35058775 -8.84894532 21.75601354 -11.4375 19.625 C-14.88331435 16.0951414 -15.39555836 14.0716348 -15.359375 9.10546875 C-14.72418186 5.38406547 -12.66020984 3.59687151 -10 1 C-6.77140153 -0.61429923 -3.49006347 -0.59570657 0 0 Z "
          fill="#ffffff"
          fillOpacity="0.4"
          transform="translate(124,71)"
        />
        <path
          d="M0 0 C2.5625 0.1875 2.5625 0.1875 4.5625 2.1875 C4.00694444 6.74305556 4.00694444 6.74305556 2.5625 8.1875 C0.125 8.375 0.125 8.375 -2.4375 8.1875 C-3.0975 7.5275 -3.7575 6.8675 -4.4375 6.1875 C-3.71780303 0.28598485 -3.71780303 0.28598485 0 0 Z "
          fill="currentColor"
          transform="translate(115.4375,79.8125)"
        />
      </g>
      <path
        d="M0 0 C1.98 0 3.96 0 6 0 C7 3 7 3 6.1796875 5.12109375 C1.52917161 13.37784802 1.52917161 13.37784802 -3 16 C-3.99 15.67 -4.98 15.34 -6 15 C-6 14.34 -6 13.68 -6 13 C-5.34 13 -4.68 13 -4 13 C-3.87882812 12.39671875 -3.75765625 11.7934375 -3.6328125 11.171875 C-3.46523437 10.37265625 -3.29765625 9.5734375 -3.125 8.75 C-2.88136719 7.56664063 -2.88136719 7.56664063 -2.6328125 6.359375 C-2.00849925 4.03168856 -1.15161458 2.10968048 0 0 Z "
        fill="#ffffff"
        fillOpacity="0.25"
        transform="translate(126,100)"
      />
      <path
        d="M0 0 C2 3 2 3 1.875 5.0625 C1 7 1 7 -3 9 C-2.01 6.03 -1.02 3.06 0 0 Z "
        fill="#ffffff"
        fillOpacity="0.25"
        transform="translate(103,85)"
      />
      <path
        d="M0 0 C0.66 0 1.32 0 2 0 C2.66 0.99 3.32 1.98 4 3 C6.05003955 4.19232613 6.05003955 4.19232613 8 5 C6.35 5.33 4.7 5.66 3 6 C0 2.25 0 2.25 0 0 Z "
        fill="#ffffff"
        fillOpacity="0.22"
        transform="translate(109,84)"
      />
    </g>
  </svg>
);

export function LandingPage() {
  const [isTesterOpen, setIsTesterOpen] = useState(false);
  const [testerEmail, setTesterEmail] = useState('');
  const [testerStatus, setTesterStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const location = useLocation();
  const navigate = useNavigate();

  const openTesterModal = () => {
    setIsTesterOpen(true);
    setTesterStatus('idle');
  };

  const closeTesterModal = () => {
    setIsTesterOpen(false);
    setTesterEmail('');
    setTesterStatus('idle');
    if (new URLSearchParams(location.search).has('early-access')) {
      navigate('/', { replace: true });
    }
  };

  const handleTesterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTesterStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      encoded.append(key, String(value));
    });

    try {
      const response = await fetch(form.getAttribute('action') ?? '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to submit early access request');
      }

      setTesterStatus('sent');
      setTesterEmail('');
    } catch (error) {
      setTesterStatus('error');
    }
  };

  useEffect(() => {
    if (new URLSearchParams(location.search).get('early-access') === '1') {
      setIsTesterOpen(true);
    }
  }, [location.search]);

  usePageMeta({
    title: 'CareTrack | Gecko Care Tracker',
    description:
      'CareTrack helps gecko owners track feeding, supplements, and health with smart reminders and offline-first care logs.',
    path: '/',
  });

  const heroIcons = [
    {
      id: 'snake-1',
      Icon: SnakeIcon,
      className: 'left-[5%] top-[10%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/10 float-slow',
      delay: '0.3s',
    },
    {
      id: 'gecko-1',
      Icon: GeckoIcon,
      className: 'right-[8%] top-[12%] h-12 w-12 sm:h-16 sm:w-16 text-slate-900/10 float-medium',
      delay: '1.1s',
    },
    {
      id: 'spider-1',
      Icon: SpiderIcon,
      className: 'left-[10%] bottom-[18%] h-9 w-9 sm:h-12 sm:w-12 text-slate-900/10 float-sway',
      delay: '0.8s',
    },
    {
      id: 'turtle-1',
      Icon: Turtle,
      className: 'right-[10%] bottom-[12%] h-12 w-12 sm:h-16 sm:w-16 text-slate-900/10 float-slow',
      delay: '1.8s',
      strokeWidth: 1.4,
    },
    {
      id: 'snake-2',
      Icon: SnakeIcon,
      className: 'left-[32%] top-[6%] h-8 w-8 text-slate-900/5 float-medium hidden md:block',
      delay: '2.4s',
    },
    {
      id: 'gecko-2',
      Icon: GeckoIcon,
      className: 'right-[35%] top-[22%] h-8 w-8 text-slate-900/5 float-sway hidden md:block',
      delay: '1.6s',
    },
    {
      id: 'spider-2',
      Icon: SpiderIcon,
      className: 'left-[40%] bottom-[6%] h-8 w-8 text-slate-900/5 float-slow hidden md:block',
      delay: '0.9s',
    },
    {
      id: 'turtle-2',
      Icon: Turtle,
      className: 'right-[26%] bottom-[30%] h-9 w-9 text-slate-900/5 float-medium hidden md:block',
      delay: '2.1s',
      strokeWidth: 1.3,
    },
    {
      id: 'snake-3',
      Icon: SnakeIcon,
      className: 'right-[12%] top-[45%] h-8 w-8 text-slate-900/5 float-slow hidden lg:block',
      delay: '0.7s',
    },
    {
      id: 'gecko-3',
      Icon: GeckoIcon,
      className: 'left-[18%] top-[40%] h-8 w-8 text-slate-900/5 float-medium hidden lg:block',
      delay: '1.9s',
    },
    {
      id: 'spider-3',
      Icon: SpiderIcon,
      className: 'right-[40%] bottom-[18%] h-8 w-8 text-slate-900/5 float-sway hidden lg:block',
      delay: '1.2s',
    },
    {
      id: 'snake-4',
      Icon: SnakeIcon,
      className: 'left-[12%] top-[52%] h-8 w-8 text-slate-900/6 float-medium hidden md:block',
      delay: '2.6s',
    },
    {
      id: 'snake-5',
      Icon: SnakeIcon,
      className: 'right-[18%] bottom-[40%] h-9 w-9 text-slate-900/6 float-slow hidden md:block',
      delay: '0.6s',
    },
    {
      id: 'snake-6',
      Icon: SnakeIcon,
      className: 'left-[46%] top-[18%] h-8 w-8 text-slate-900/5 float-sway hidden lg:block',
      delay: '1.4s',
    },
    {
      id: 'snake-7',
      Icon: SnakeIcon,
      className: 'right-[48%] bottom-[8%] h-7 w-7 text-slate-900/5 float-medium hidden lg:block',
      delay: '2.2s',
    },
    {
      id: 'spider-4',
      Icon: SpiderIcon,
      className: 'right-[6%] top-[38%] h-8 w-8 text-slate-900/6 float-sway hidden md:block',
      delay: '0.4s',
    },
    {
      id: 'spider-5',
      Icon: SpiderIcon,
      className: 'left-[24%] bottom-[30%] h-9 w-9 text-slate-900/6 float-slow hidden md:block',
      delay: '1.7s',
    },
    {
      id: 'spider-6',
      Icon: SpiderIcon,
      className: 'left-[52%] top-[42%] h-7 w-7 text-slate-900/5 float-medium hidden lg:block',
      delay: '2.8s',
    },
    {
      id: 'spider-7',
      Icon: SpiderIcon,
      className: 'right-[32%] top-[58%] h-7 w-7 text-slate-900/5 float-slow hidden lg:block',
      delay: '0.9s',
    },
  ];

  const featuresIcons = [
    {
      id: 'features-snake-1',
      Icon: SnakeIcon,
      className: 'left-[6%] top-[12%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-slow',
      delay: '0.6s',
    },
    {
      id: 'features-spider-1',
      Icon: SpiderIcon,
      className: 'right-[8%] top-[18%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-sway',
      delay: '1.2s',
    },
  ];

  const howIcons = [
    {
      id: 'how-snake-1',
      Icon: SnakeIcon,
      className: 'left-[8%] top-[14%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-medium',
      delay: '0.8s',
    },
    {
      id: 'how-spider-1',
      Icon: SpiderIcon,
      className: 'right-[12%] top-[10%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-sway',
      delay: '1.4s',
    },
  ];

  const ctaIcons = [
    {
      id: 'cta-snake-1',
      Icon: SnakeIcon,
      className: 'left-[8%] top-[18%] h-9 w-9 text-white/12 float-slow',
      delay: '0.7s',
    },
    {
      id: 'cta-spider-1',
      Icon: SpiderIcon,
      className: 'right-[10%] top-[12%] h-9 w-9 text-white/12 float-sway',
      delay: '1.5s',
    },
    {
      id: 'cta-snake-2',
      Icon: SnakeIcon,
      className: 'right-[16%] bottom-[16%] h-7 w-7 text-white/10 float-medium hidden md:block',
      delay: '2.4s',
    },
    {
      id: 'cta-spider-2',
      Icon: SpiderIcon,
      className: 'left-[18%] bottom-[20%] h-7 w-7 text-white/10 float-slow hidden md:block',
      delay: '1.1s',
    },
  ];

  const renderFloatingIcons = (
    icons: {
      id: string;
      Icon: React.ComponentType<IconProps>;
      className: string;
      delay: string;
      strokeWidth?: number;
    }[],
  ) => (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {icons.map(({ id, Icon, className, delay, strokeWidth }) => (
        <Icon
          key={id}
          className={`absolute ${className} motion-reduce:animate-none`}
          strokeWidth={strokeWidth}
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <TopNav
        rightSlot={(
          <div className="flex items-center gap-4">
            <Link
              to="/learn"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Learn
            </Link>
            <Link
              to="/privacy"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        )}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {renderFloatingIcons(heroIcons)}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
                Track Your Gecko's Care with Confidence
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Never forget a feeding or supplement again. CareTrack helps you provide the best care for your gecko with smart reminders and a built-in knowledge base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  type="button"
                  onClick={openTesterModal}
                  className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Test it early
                </button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src={geico}
                alt="Gecko"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {renderFloatingIcons(featuresIcons)}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
              Everything You Need for Gecko Care
            </h2>
            <p className="text-xl text-slate-600">
              Designed specifically for reptile owners who want to provide the best care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Feeding Tracker</h3>
              <p className="text-slate-600">
                Log feedings with ease and track food types, quantities, and supplements applied.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Smart Reminders</h3>
              <p className="text-slate-600">
                Never miss a feeding or supplement schedule with customizable notifications.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Knowledge Base</h3>
              <p className="text-slate-600">
                Access expert gecko care guides right when you need them, completely offline.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Health Logs</h3>
              <p className="text-slate-600">
                Track shedding, weight, and behavioral observations to monitor your gecko's health.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Multiple Pets</h3>
              <p className="text-slate-600">
                Manage care for all your geckos in one place with individual profiles.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Offline First</h3>
              <p className="text-slate-600">
                All features work without internet. Your data stays private on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {renderFloatingIcons(howIcons)}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
              Simple, Yet Powerful
            </h2>
            <p className="text-xl text-slate-600">
              Get started in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Create a Profile</h3>
              <p className="text-slate-600">
                Add your gecko's details - name, species, and age
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Set Your Schedule</h3>
              <p className="text-slate-600">
                Define feeding and supplement routines that work for you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Track with Ease</h3>
              <p className="text-slate-600">
                One-tap feeding logs and automatic schedule updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 relative overflow-hidden">
        {renderFloatingIcons(ctaIcons)}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ready to Provide Better Care?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join gecko owners who trust CareTrack for their reptile care needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={openTesterModal}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Test it early
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {isTesterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={closeTesterModal}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl text-slate-900">Join the tester program</h3>
                <p className="text-slate-600 mt-2">
                  Enter your email to join. We will send you an email in a few days with next steps.
                </p>
                <p className="text-sm text-slate-500 mt-3">
                  Google Play is only available for registered users. Access the listing here:{' '}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.osacore.caretrack&pcampaignid=web_share"
                    className="text-emerald-600 hover:text-emerald-700 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Play link
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={closeTesterModal}
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Close
              </button>
            </div>

            <form
              className="space-y-6"
              onSubmit={handleTesterSubmit}
              name="early-access"
              method="POST"
              action="/?submitted=early-access"
              encType="application/x-www-form-urlencoded"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="early-access" />
              <input type="hidden" name="subject" value="CareTrack Early Access" />
              <input type="hidden" name="bot-field" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="tester-email">
                  Email
                </label>
                <input
                  id="tester-email"
                  name="email"
                  type="email"
                  value={testerEmail}
                  onChange={(event) => setTesterEmail(event.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={testerStatus === 'sending'}
                >
                  {testerStatus === 'sending' ? 'Sending...' : 'Join tester program'}
                </button>
                {testerStatus === 'sent' && (
                  <p className="text-emerald-600">Thanks! You are on the list.</p>
                )}
                {testerStatus === 'error' && (
                  <p className="text-rose-600">
                    We could not submit your request. Please try again later.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
