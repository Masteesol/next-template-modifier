import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import { NextPage } from 'next';
import PageLayout from "@/components/PageLayout";
import {
  CardBaseLightHover,
  DividerPipe,
  FlexColCentered,
  FlexColCenteredX,
  FlexColContainer,
  FlexRowCentered,
  FlexRowCenteredY,
  FlexRowContainer,
  AddButton,
} from "@/components/styled-global-components";

import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import { useTranslation } from "next-i18next";
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { debounce } from 'lodash';
import ForwardedRefTemplateCard from "@/components/TemplateEditor/TemplateCard";
import TemplateNavButton from "@/components/TemplateEditor/TemplateNavButton";
import CategoryList, { CategoryHeaderButton } from "@/components/TemplateEditor/CategoryList";
import GuidingDescriptionText from "@/components/TemplateEditor/GuidingDescription";
import cookie from 'cookie'
import { createCategory, removeCategory, updateCategory } from '@/requests/categories';
import { createTemplate, removeTemplate, updateTemplate } from '@/requests/templates';
import { LoadingContext } from '@/context/LoadingContext';


interface Templates {
  title: string;
  text: string;
  template_id: string;
}

interface TemplatesContainer {
  category_id: string;
  category_name: string;
  templates: Templates[];
}

type PageProps = {
  authenticated: boolean,
  userID: string | null,
}

const delayedUpdateCategory = debounce((category_id, userID, newCatTitle) => {
  updateCategory(category_id, userID, newCatTitle)
  console.log("updated category")
}, 2000);

const delayedUpdateTemplateText = debounce((template_id, userID, newText, newTitle) => {
  updateTemplate(template_id, userID, newText, newTitle)
  console.log("updated template")
}, 2000);

const checkLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return true;
}

const Page: NextPage<PageProps> = ({ authenticated, userID }) => {
  //const { t } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [textTemplates, setTextTemplates] = useState<TemplatesContainer[]>([]);
  const [templateRefs, setTemplateRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const [viewCategories, setViewCategories] = useState(true);
  const [viewNavigation, setViewNavigation] = useState(true);
  const { setIsLoading } = useContext(LoadingContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchTemplatesForUser = async (userId: string | undefined | null) => {
      if (!userId) {
        return Promise.resolve(null); // or some other default value
      }
      setIsLoading(true)
      const response = await fetch(`/api/templates/getTemplates?userId=${userId}`);
      const data = await response.json();
      setIsLoading(false)
      return data;
    };
    // Call the async function and handle the response
    fetchTemplatesForUser(userID).then((data) => {
      if (data) {
        // The response data should be mapped to your TemplatesContainer structure
        const templatesContainers: TemplatesContainer[] = data;
        //console.log(templatesContainers, "templatesContainers")
        setTextTemplates(templatesContainers);
      }
    });
  }, [userID]);

  useEffect(() => {
    const getViewCategories = () => {
      const savedValue = checkLocalStorage("viewCategories")
      if (savedValue === true || savedValue === false) {
        setViewCategories(savedValue)
      }
    }
    const getViewTemplates = () => {
      const savedValue = checkLocalStorage("viewNavigation")
      if (savedValue === true || savedValue === false) {
        setViewNavigation(savedValue)
      }
    }
    getViewCategories()
    getViewTemplates()
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleSelectCategory = (index: number) => {
    setSelectedCategory(index);
  }
  const handleViewCategorySelect = () => {
    setViewCategories(prevViewCategories => {
      if (typeof window !== "undefined") {
        localStorage.setItem('viewCategories', JSON.stringify(!prevViewCategories));
      }
      return !prevViewCategories;
    });
  }

  const handleViewNavigationSelect = () => {
    setViewNavigation(prevViewNavigation => {
      if (typeof window !== "undefined") {
        localStorage.setItem('viewNavigation', JSON.stringify(!prevViewNavigation));
      }
      return !prevViewNavigation;
    });
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (textTemplates.length > 0 && selectedCategory < textTemplates.length) {
      const newRefs = textTemplates[selectedCategory].templates.map((_, i) => templateRefs[i] || React.createRef());
      setTemplateRefs(newRefs);
    }
  }, [textTemplates, selectedCategory]);
  /* eslint-disable react-hooks/exhaustive-deps */

  const handleInputCatTitleChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number, category_id: string) => {
    const newCatTitle = e.target.value;
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    delayedUpdateCategory(category_id, userID, newCatTitle)
    //updateCategory(category_id, userID, newCatTitle)
    const newTextTemplates = [...textTemplates];
    newTextTemplates[index].category_name = newCatTitle;
    setTextTemplates(newTextTemplates);
  };

  const handleTextTemplateChange = (categoryIndex: number, templateIndex: number, newTemplate: any) => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    const { template_id, text, title } = newTemplate
    delayedUpdateTemplateText(template_id, userID, text, title)
    setTextTemplates(prevTemplates => {
      const newTemplates = [...prevTemplates];
      // Copy the templates array of the category
      const categoryTemplates = [...newTemplates[categoryIndex].templates];
      // Replace the specific template with the new template
      categoryTemplates[templateIndex] = newTemplate;
      // Replace the category's templates array with the modified templates array
      newTemplates[categoryIndex] = {
        ...newTemplates[categoryIndex],
        templates: categoryTemplates,
      };
      return newTemplates;
    });
    //console.log(textTemplates)
  };

  const handleCreateCategory = async () => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    try {
      const newCategory = await createCategory("New Category", userID);
      const { category_id, category_name } = newCategory[0]
      const newCategoryWithTemplates: TemplatesContainer = {
        category_id: category_id,
        category_name: category_name,
        templates: []
      }
      const updatedTextTemplates = [newCategoryWithTemplates, ...textTemplates];

      setTextTemplates(updatedTextTemplates);
      setSelectedCategory(0);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  }

  const handleCreateTemplate = async () => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    try {
      const newID = uuidv4()
      const newTemplate = await createTemplate(newID, "New Template", "Template text...", textTemplates[selectedCategory].category_id, userID);
      console.log(newTemplate)
      const updatedTemplates = [newTemplate[0], ...textTemplates[selectedCategory].templates];
      const updatedTextTemplates = textTemplates.map((item, index) => {
        if (index === selectedCategory) {
          return {
            ...item,
            templates: updatedTemplates,
          };
        }
        return item;
      });
      setTextTemplates(updatedTextTemplates);
      console.log("new text templates", textTemplates)
    } catch (error) {
      console.error("Failed to create template:", error);
    }
  }

  const handleRemoveTemplate = (index: number, template_id: string) => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    console.log("handleRemoveTemplate", template_id)
    removeTemplate(template_id, userID)
    const updatedTemplates = textTemplates[selectedCategory].templates.filter((_, i) => i !== index);
    const updatedTextTemplates = textTemplates.map((item, index) => {
      if (index === selectedCategory) {
        return {
          ...item,
          templates: updatedTemplates,
        };
      }
      return item;
    });
    setTextTemplates(updatedTextTemplates);
  };

  const handleRemoveCategory = (index: number, category_id: string) => {
    //console.log(categoryId)
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    removeCategory(category_id, userID)
    const updatedCategories = textTemplates.filter((_, i) => i !== index);
    setTextTemplates(updatedCategories);

    // You might want to handle the case where the currently selected category is deleted.
    // For example, you could default to the first category (if there is one).
    if (index === selectedCategory) {
      setSelectedCategory(updatedCategories.length > 0 ? 0 : -1);
    }
  };
  return (
    <>
      <Head>
        <title>Templates</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={authenticated}>
        <FlexRowContainer className="h-full gap-2 overflow-x-auto">
          <FlexColContainer className="absolute  bottom-[5vh] gap-4 right-0 z-50 ">
            {!viewCategories &&
              <FlexRowCentered className="relative bg-slate-100 rounded shadow">
                <div className="absolute right-[10rem]">
                  <AddTemplateButton onClick={handleCreateCategory} />
                </div>
                <CategoryHeaderButton viewCategories={viewCategories} handleViewCategorySelect={handleViewCategorySelect} />
              </FlexRowCentered>
            }
            {textTemplates?.length > 0 &&
              textTemplates[selectedCategory].templates.length > 0 && !viewNavigation &&
              <FlexRowCentered className="relative bg-slate-100 rounded shadow">
                <div className="absolute right-[10rem]">
                  <AddTemplateButton onClick={handleCreateTemplate} />
                </div>
                <NavigationHeaderButton viewNavigation={viewNavigation} handleViewNavigationSelect={handleViewNavigationSelect} />
              </FlexRowCentered>
            }
          </FlexColContainer>
          <FlexRowContainer className=" gap-2 h-full">
            <FlexRowContainer className="h-full">
              {viewCategories &&
                <CategoryList
                  viewCategories={viewCategories}
                  handleViewCategorySelect={handleViewCategorySelect}
                  textTemplates={textTemplates}
                  addCategory={handleCreateCategory}
                  selectedCategory={selectedCategory}
                  handleSelectCategory={handleSelectCategory}
                  handleRemoveCategory={handleRemoveCategory}
                  handleInputCatTitleChange={handleInputCatTitleChange}
                />
              }
            </FlexRowContainer>
            {viewCategories && <DividerPipe />}
            {
              textTemplates.length > 0 &&
              textTemplates[selectedCategory].templates.length > 0 &&
              viewNavigation &&
              <FlexColContainer className="p-2">
                <NavigationHeaderButton viewNavigation={viewNavigation} handleViewNavigationSelect={handleViewNavigationSelect} />
                <FlexColCenteredX className="w-full gap-4 min-w-[18rem] max-w-[18rem] max-h-[90%] overflow-y-auto">

                  {textTemplates[selectedCategory].templates.map((template, templateIndex) => (
                    <TemplateNavButton
                      template={template}
                      index={templateIndex}
                      categoryIndex={selectedCategory}
                      templateRefs={templateRefs}
                      key={`template-nav-button-${selectedCategory}-${templateIndex}`}
                    />
                  ))}
                </FlexColCenteredX>
                <FlexColCentered className="mt-auto w-full mb-2 gap-4">
                  <AddTemplateButton onClick={handleCreateTemplate} />
                </FlexColCentered>
              </FlexColContainer>
            }
            {textTemplates.length > 0 &&
              textTemplates[selectedCategory].templates.length > 0 &&
              viewNavigation && <DividerPipe />}
          </FlexRowContainer>
          <FlexRowContainer className="gap-4 w-full justify-center overflow-y-auto h-full" id="templates-container">
            <FlexColContainer className="w-full max-w-[900px] gap-4 relative h-full">
              {textTemplates.length > 0 && textTemplates[0].category_name !== undefined ?
                <FlexColContainer className="gap-4 h-full">
                  <FlexColContainer className="max-h-[77vh] h-full" >
                    <FlexColContainer className="gap-4 h-full">
                      {
                        textTemplates[selectedCategory].templates.length > 0
                        && textTemplates[selectedCategory].templates.map((template, templateIndex) =>
                          <ForwardedRefTemplateCard
                            key={template.template_id}
                            categoryIndex={selectedCategory}
                            index={templateIndex}
                            template={template}
                            handleRemoveTemplate={handleRemoveTemplate}
                            handleTextTemplateChange={handleTextTemplateChange}
                            ref={templateRefs[templateIndex]}
                          />
                        )
                      }
                      {textTemplates[selectedCategory].templates.length === 0 &&
                        <FlexColCentered className="h-full ">
                          <FlexColContainer className="max-w-[400px] w-full gap-4">
                            <GuidingDescriptionText>Click the &quot;+&quot; button to create new template</GuidingDescriptionText>
                            {/**  <FlexColCentered className="bg-green-200 dark:bg-green-800 w-full p-4 rounded">
                              <h2>Add Template</h2>
                            </FlexColCentered>*/}

                            <FlexColCentered className="w-full" >
                              <AddTemplateButtonEmpty onClick={handleCreateTemplate} />
                            </FlexColCentered>
                          </FlexColContainer>
                        </FlexColCentered>
                      }
                    </FlexColContainer>
                  </FlexColContainer>

                </FlexColContainer>
                : <FlexColContainer className="w-full max-w-[800px]"><GuidingDescriptionText>Your templates will show up here, but first add a template category.</GuidingDescriptionText></FlexColContainer>
              }
            </FlexColContainer>
          </FlexRowContainer>
        </FlexRowContainer>
      </PageLayout>
    </>
  );
}

const NavigationHeaderButton = ({ viewNavigation, handleViewNavigationSelect }: any) => {
  return <FlexRowCentered className={`p-4 gap-4 rounded`}>
    <h2>Templates</h2>
    <FlexRowCenteredY className="text-lg cursor-pointer" onClick={handleViewNavigationSelect}>
      {!viewNavigation ? <FaEye /> : <FaEyeSlash />}
    </FlexRowCenteredY>
  </FlexRowCentered>
}


const AddTemplateButton = ({ onClick }: any) => {
  return <FlexRowContainer className="justify-end w-full">
    <AddButton onClick={onClick}>
      <FlexColCentered>
        <FaPlus />
      </FlexColCentered>
    </AddButton>
  </FlexRowContainer>
}

const AddTemplateButtonEmpty = ({ onClick }: any) => {
  return <CardBaseLightHover className="w-full bg-green-300 p-4 hover:bg-green-200 cursor-pointer" onClick={onClick}>
    <FlexColCentered>
      <FaPlus />
    </FlexColCentered>
  </CardBaseLightHover>
}




export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const token = cookies && cookies.supabaseToken
  const userID = cookies && cookies.userID
  const authenticated = token
  if (!authenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      authenticated: Boolean(token),
      userID: userID || null,
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}
export default Page;