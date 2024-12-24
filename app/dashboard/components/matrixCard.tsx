import { Card, CardContent } from '@/components/ui/card';

type ColorVariant = 'blue' | 'yellow' | 'green';
interface MatrixCardProps {
  name: string;
  value: number;
  icon: React.ElementType;
  color: ColorVariant;
}

export default function MatrixCard({ name, value, icon: Icon, color }: MatrixCardProps) {
  const colorStyles = {
    blue: {
      text: 'text-blue-900',
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
    },
    yellow: {
      text: 'text-yellow-900',
      bg: 'bg-yellow-100',
      icon: 'text-yellow-600',
    },
    green: {
      text: 'text-green-900',
      bg: 'bg-green-100',
      icon: 'text-green-600',
    },
  };
  return (
    <Card>
      <CardContent className='flex items-center justify-between p-6'>
        <div>
          <p className='text-sm font-medium text-gray-500'>{name}</p>
          <p className={`text-2xl font-semibold ${colorStyles[color].text}`}>{value}</p>
        </div>
        <div className={`p-3 ${colorStyles[color].bg} rounded-full`}>
          <Icon className={`h-6 w-6 ${colorStyles[color].icon}`} />
        </div>
      </CardContent>
    </Card>
  );
}
