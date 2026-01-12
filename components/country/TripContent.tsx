type TripData = {
  date: string;
  duration: string;
  highlights: string[];
  story: string;
};

type TripContentProps = {
  data: TripData;
};

export default function TripContent({ data }: TripContentProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-8 text-white">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Date</h3>
          <p className="text-gray-300">{data.date}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Duration</h3>
          <p className="text-gray-300">{data.duration}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Highlights</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {data.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Story</h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">{data.story}</p>
      </div>
    </div>
  );
}