import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";

export default function PostJobButton({ stretch }: { stretch?: boolean }) {
  const { address, session } = useAuth();

  if (!session?.dao) return null;

  return (
    <Link href="/post_job" passHref>
      <a
        className={`${
          stretch
            ? "w-[200px]"
            : session?.user || session?.dao
            ? "min-w-[160px] lg:min-w-[160px]"
            : "min-w-[200px]"
        } h-[40px] flex justify-center items-center gap-2 rounded-[24px] border border-primary-400
      font-medium text-btn4 text-primary-400 light-shadow`}
      >
        <Image width={24} height={24} src="/icons/ic_job.svg" alt="icon" />
        <span>POST A JOB</span>
      </a>
    </Link>
  );
}
