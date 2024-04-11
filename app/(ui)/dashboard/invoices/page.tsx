import { Suspense } from 'react';
import Search from '../../search';
import { CreateInvoice } from './buttons';
import { InvoicesTableSkeleton } from '../../skeletons';
import Table from './table';
import Pagination from './pagination';
import { fetchInvoicesPages } from '@/app/lib/data';

// Server component
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`lusitana.className text-2xl`}>Invoices</h1>
      </div>
      <div className="gap-w mt-4 flex items-center justify-between md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-4 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
