const Story = ({ image, title }: { image: string, title: string }) => {
    return (
        <div className="flex-shrink-0 p-[2px] rounded-[16px] bg-gradient-to-r from-pink-500 to-purple-500 size-28 cursor-pointer">
            <div className="relative bg-[#f5f5f5] p-[2px] rounded-[14px] w-full h-full">
                <img width="80" height="80" src={image} className="rounded-[12px] w-full h-full" />
                <p className="absolute top-0 left-0 right-0 text-sm text-white p-3 leading-none">
                    {title}
                </p>
            </div>
        </div>
    )
}

export default Story;
