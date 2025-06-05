const LoadingComponent = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center inset-0 h-[88vh]">
  <div
    className="w-20 h-20 border-4 border-transparent text-purple-400 text-4xl animate-spin flex items-center justify-center border-t-purple-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-primary text-2xl animate-spin flex items-center justify-center border-t-primary rounded-full"
    ></div>
  </div>
</div>
  )
}
export default LoadingComponent;