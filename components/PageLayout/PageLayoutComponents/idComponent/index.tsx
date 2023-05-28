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
    const pathSegments = router.asPath
      .split("/")
      .filter((segment) => segment);

    const breadcrumbPaths: BreadcrumbPath[] = [
      { name: t("paths.home"), url: "/" },
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
    <div ref={ref} className="bg-slate-50 p-3 dark:bg-gray-800">
      <Breadcrumbs paths={breadcrumbs} />
    </div>
  );
});

IdComponent.displayName = "IdComponent";

export default IdComponent;
