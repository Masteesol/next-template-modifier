import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import translatePath from "@/utils/translatePath";
import Breadcrumbs from "../breadCrumbs";
import { forwardRef } from "react";

interface BreadcrumbPath {
  name: string;
  url: string | null;
}

const IdComponent = forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const createBreadcrumbs = (): BreadcrumbPath[] => {
    // Use URL to parse the router's asPath, then get the pathname
    const pathSegments = new URL(router.asPath, "http://example.com").pathname.split("/").filter(segment => segment);

    const breadcrumbPaths: BreadcrumbPath[] = [
      { name: t("paths.home"), url: "/app" },
    ];

    let accumulatedPath = "";

    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;

      const name = translatePath(segment, t, router.locale || "en");

      if (index === pathSegments.length - 1) {
        breadcrumbPaths.push({ name, url: null });
      } else {
        breadcrumbPaths.push({ name, url: accumulatedPath });
      }
    });

    return breadcrumbPaths;
  };

  const breadcrumbs = createBreadcrumbs();

  return (
    <div ref={ref} className="bg-slate-50 text-sm md:text-base p-3 dark:bg-gray-800">
      <Breadcrumbs paths={breadcrumbs} />
    </div>
  );
});

IdComponent.displayName = "IdComponent";

export default IdComponent;
