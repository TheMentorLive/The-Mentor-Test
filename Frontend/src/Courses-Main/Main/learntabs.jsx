export default function Learntabs() {
    const Card = ({ children, className }) => (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>{children}</div>
    );
  
    const CardHeader = ({ children, className }) => (
      <div className={`border-b pb-4 ${className}`}>{children}</div>
    );
  
    const CardTitle = ({ children, className }) => (
      <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
    );
  
    const CardContent = ({ children, className }) => (
      <div className={`py-4 ${className}`}>{children}</div>
    );
  
    const CardFooter = ({ children, className }) => (
      <div className={`border-t pt-4 ${className}`}>{children}</div>
    );
  
    const Button = ({ children, className }) => (
      <button className={`px-4 py-2 rounded ${className}`}>{children}</button>
    );
  
    return (
      <div className="flex flex-col items-center p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-600">COURSES</h1>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold text-blue-600">DATA ANALYTICS</CardTitle>
              <div className="w-full h-1 bg-blue-600" />
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src="/placeholder.svg"
                alt="Data Analytics"
                className="w-full h-48 rounded-lg"
                width="300"
                height="200"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <h2 className="text-lg font-bold text-blue-600">Turning Data to Decisions</h2>
              <p className="text-sm font-medium text-muted-foreground">Over 10,000+ professionals trained</p>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 text-white">Read More</Button>
            </CardFooter>
          </Card>
          <Card className="text-center bg-blue-600 text-white">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold">MENTOR TRAINING PROGRAM</CardTitle>
              <div className="w-full h-1 bg-white" />
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src="/placeholder.svg"
                alt="Mentor Training Program"
                className="w-full h-48 rounded-lg"
                width="300"
                height="200"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <h2 className="text-lg font-bold">One Course that covers it all</h2>
              <p className="text-sm font-medium">98% satisfaction rate among students</p>
            </CardContent>
            <CardFooter>
              <Button className="bg-white text-blue-600">Read More</Button>
            </CardFooter>
          </Card>
          <Card className="text-center">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold text-blue-600">DIGITAL MARKETING</CardTitle>
              <div className="w-full h-1 bg-blue-600" />
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src="/placeholder.svg"
                alt="Digital Marketing"
                className="w-full h-48 rounded-lg"
                width="300"
                height="200"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <h2 className="text-lg font-bold text-blue-600">Turning Strategies to Campaigns</h2>
              <p className="text-sm font-medium text-muted-foreground">500+ campaigns successfully executed</p>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 text-white">Read More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  