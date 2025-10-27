import CaseBrief from '../CaseBrief';
import { missions } from '@/lib/missions';

export default function CaseBriefExample() {
  return <CaseBrief mission={missions[0]} />;
}
