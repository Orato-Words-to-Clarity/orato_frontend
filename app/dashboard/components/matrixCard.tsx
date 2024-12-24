import { Card, CardContent } from '@/components/ui/card';

interface MatrixCardProps {
  name: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

export default function MatrixCard({ name, value, icon: Icon, color }: MatrixCardProps) {
  return (
    <Card>
      <CardContent className='flex items-center justify-between p-6'>
        <div>
          <p className='text-sm font-medium text-gray-500'>{name}</p>
          <p className={`text-2xl font-semibold text-${color}-900`}>{value}</p>
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </CardContent>
    </Card>
  );
}
