// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/4y2cVD9jBB9
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import Link from "next/link"
// import { Progress } from "@/components/ui/progress"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="flex items-center justify-between h-16 px-4 bg-[#1E90FF] text-white">
//         <div className="flex items-center space-x-2">
//           <LogInIcon className="w-6 h-6" />
//           <span className="text-lg font-semibold">Gen AI Learning</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <span>Hi, Your Name</span>
//           <BellIcon className="w-6 h-6" />
//           <Avatar>
//             <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
//             <AvatarFallback>UN</AvatarFallback>
//           </Avatar>
//         </div>
//       </header>
//       <div className="flex flex-1">
//         <aside className="w-64 p-4 border-r">
//           <nav className="space-y-4">
//             <Link href="#" className="flex items-center space-x-2 text-[#1E90FF]" prefetch={false}>
//               <LayoutDashboardIcon className="w-5 h-5" />
//               <span>Dashboard</span>
//             </Link>
//             <div className="flex items-center space-x-2 text-gray-700">
//               <CalendarIcon className="w-5 h-5" />
//               <span>Courses</span>
//               <div className="ml-auto">
//                 <Progress value={75} aria-label="75% course completion" />
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-700">
//               <TestTubesIcon className="w-5 h-5" />
//               <span>Mock Tests</span>
//               <div className="ml-auto">
//                 <Progress value={60} aria-label="60% mock test completion" />
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-700">
//               <LinkedinIcon className="w-5 h-5" />
//               <span>Job Portal</span>
//               <div className="ml-auto">
//                 <Progress value={40} aria-label="40% job applications submitted" />
//               </div>
//             </div>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <MilestoneIcon className="w-5 h-5" />
//               <span>Mentors</span>
//             </Link>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <LibraryIcon className="w-5 h-5" />
//               <span>Library</span>
//             </Link>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <CalendarIcon className="w-5 h-5" />
//               <span>Calendar</span>
//             </Link>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <GroupIcon className="w-5 h-5" />
//               <span>Community</span>
//             </Link>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <UsersIcon className="w-5 h-5" />
//               <span>My Profile</span>
//             </Link>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <SettingsIcon className="w-5 h-5" />
//               <span>Settings</span>
//             </Link>
//             <Link href="#" className="flex items-center space-x-2 text-gray-700" prefetch={false}>
//               <LogOutIcon className="w-5 h-5" />
//               <span>Log Out</span>
//             </Link>
//           </nav>
//         </aside>
//         <main className="flex-1 p-6">
//           <h1 className="text-2xl font-semibold">Dashboard</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//             <Card className="p-4">
//               <CardHeader>
//                 <CardTitle>Courses</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-3xl font-bold">75%</div>
//                     <div className="text-gray-500">Completed</div>
//                   </div>
//                   <div>
//                     <CalendarIcon className="w-8 h-8 text-[#1E90FF]" />
//                   </div>
//                 </div>
//                 <Progress value={75} aria-label="75% course completion" className="mt-4" />
//               </CardContent>
//             </Card>
//             <Card className="p-4">
//               <CardHeader>
//                 <CardTitle>Mock Tests</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-3xl font-bold">60%</div>
//                     <div className="text-gray-500">Completed</div>
//                   </div>
//                   <div>
//                     <TestTubesIcon className="w-8 h-8 text-[#1E90FF]" />
//                   </div>
//                 </div>
//                 <Progress value={60} aria-label="60% mock test completion" className="mt-4" />
//               </CardContent>
//             </Card>
//             <Card className="p-4">
//               <CardHeader>
//                 <CardTitle>Job Applications</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-3xl font-bold">40%</div>
//                     <div className="text-gray-500">Submitted</div>
//                   </div>
//                   <div>
//                     <LinkedinIcon className="w-8 h-8 text-[#1E90FF]" />
//                   </div>
//                 </div>
//                 <Progress value={40} aria-label="40% job applications submitted" className="mt-4" />
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function BellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//       <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//     </svg>
//   )
// }


// function CalendarIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M8 2v4" />
//       <path d="M16 2v4" />
//       <rect width="18" height="18" x="3" y="4" rx="2" />
//       <path d="M3 10h18" />
//     </svg>
//   )
// }


// function GroupIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 7V5c0-1.1.9-2 2-2h2" />
//       <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
//       <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
//       <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
//       <rect width="7" height="5" x="7" y="7" rx="1" />
//       <rect width="7" height="5" x="10" y="12" rx="1" />
//     </svg>
//   )
// }


// function LayoutDashboardIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="7" height="9" x="3" y="3" rx="1" />
//       <rect width="7" height="5" x="14" y="3" rx="1" />
//       <rect width="7" height="9" x="14" y="12" rx="1" />
//       <rect width="7" height="5" x="3" y="16" rx="1" />
//     </svg>
//   )
// }


// function LibraryIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m16 6 4 14" />
//       <path d="M12 6v14" />
//       <path d="M8 8v12" />
//       <path d="M4 4v16" />
//     </svg>
//   )
// }


// function LinkedinIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//       <rect width="4" height="12" x="2" y="9" />
//       <circle cx="4" cy="4" r="2" />
//     </svg>
//   )
// }


// function LogInIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
//       <polyline points="10 17 15 12 10 7" />
//       <line x1="15" x2="3" y1="12" y2="12" />
//     </svg>
//   )
// }


// function LogOutIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//       <polyline points="16 17 21 12 16 7" />
//       <line x1="21" x2="9" y1="12" y2="12" />
//     </svg>
//   )
// }


// function MilestoneIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
//       <path d="M12 13v8" />
//       <path d="M12 3v3" />
//     </svg>
//   )
// }


// function SettingsIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }


// function TestTubesIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2" />
//       <path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2" />
//       <path d="M3 2h7" />
//       <path d="M14 2h7" />
//       <path d="M9 16H4" />
//       <path d="M20 16h-5" />
//     </svg>
//   )
// }


// function UsersIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   )
// }