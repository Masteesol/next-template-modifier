import Head from "next/head";
import React, { useState, useEffect } from "react";
import { NextPage } from 'next';
import PageLayout from "@/components/PageLayout";
import { FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCentered, FlexRowCenteredY, FlexRowContainer } from "@/components/styled-global-components";

import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import { useTranslation } from "next-i18next";
import { v4 as uuidv4 } from 'uuid';
import tw from "tailwind-styled-components";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";

//import mockData from "@/mockData/templateText.json"
//import mockData from "@/mockData/templateTextEmpty.json"
import ForwardedRefTemplateCard from "@/components/TemplateEditor/TemplateCard";
import TemplateNavButton from "@/components/TemplateEditor/TemplateNavButton";
import CategoryList, { CategoryHeaderButton } from "@/components/TemplateEditor/CategoryList";
import GuidingDescriptionText from "@/components/TemplateEditor/GuidingDescription";
//import debounce from 'lodash.debounce';
import cookie from 'cookie'
import { createCategory, removeCategory } from '@/api/categories';
import { createTemplate, removeTemplate } from '@/api/templates';

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


const Page: NextPage<PageProps> = ({ authenticated, userID }) => {
  //const { t } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [textTemplates, setTextTemplates] = useState<TemplatesContainer[]>([]);
  const [templateRefs, setTemplateRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const [viewCategories, setViewCategories] = useState(true)
  const [viewNavigation, setViewNavigation] = useState(true)
  //const [categoryRequestInProgress, setCategoryRequestInProgress] = useState(false);

  //console.log()
  useEffect(() => {
    const fetchTemplatesForUser = async (userId: string | undefined | null) => {
      if (!userId) {
        return Promise.resolve(null); // or some other default value
      }

      const response = await fetch(`/api/templates?userId=${userId}`);
      const data = await response.json();

      return data;
    };


    // Call the async function and handle the response
    fetchTemplatesForUser(userID).then((data) => {
      if (data) {
        // The response data should be mapped to your TemplatesContainer structure
        let templatesContainers: TemplatesContainer[] = data;
        //console.log(templatesContainers, "templatesContainers")
        setTextTemplates(templatesContainers);
      }
    });
  }, [userID]); // Ensure the effect runs when the userID changes


  const handleSelectCategory = (index: number) => {
    setSelectedCategory(index);
  }
  const handleViewCategorySelect = () => {
    setViewCategories(!viewCategories)
  }

  const handleViewNavigationSelect = () => {
    setViewNavigation(!viewNavigation)
  }
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (textTemplates.length > 0 && selectedCategory < textTemplates.length) {
      const newRefs = textTemplates[selectedCategory].templates.map((_, i) => templateRefs[i] || React.createRef());
      setTemplateRefs(newRefs);
    }
  }, [textTemplates, selectedCategory]);
  /* eslint-disable react-hooks/exhaustive-deps */

  const handleInputCatTitleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTextTemplates = [...textTemplates];
    newTextTemplates[index].category_name = e.target.value;
    setTextTemplates(newTextTemplates);
  };

  const handleTextTemplateChange = (categoryIndex: number, templateIndex: number, newTemplate: any) => {
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

  if (!authenticated) {
    window.location.replace("/sign-in")
  }
  return (
    <>
      <Head>
        <title>Templates</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexRowContainer className="h-full gap-2 overflow-x-auto">
          <FlexRowContainer className="gap-4 absolute top-[-5px] w-[90%] justify-end">
            {!viewCategories &&
              <CategoryHeaderButton viewCategories={viewCategories} handleViewCategorySelect={handleViewCategorySelect} />
            }
            {textTemplates?.length > 0 &&
              textTemplates[selectedCategory].templates.length > 0 && !viewNavigation &&
              <NavigationHeaderButton viewNavigation={viewNavigation} handleViewNavigationSelect={handleViewNavigationSelect} />
            }
          </FlexRowContainer>
          <FlexRowContainer className="bg-gray-200 dark:bg-gray-700 gap-2 h-full">
            <FlexRowContainer className="h-full bg-gray-300 dark:bg-gray-600">
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
            {
              textTemplates.length > 0 &&
              textTemplates[selectedCategory].templates.length > 0 &&
              viewNavigation &&
              <FlexColContainer className="p-2">
                <FlexColCenteredX className="w-full gap-4 min-w-[18rem] max-w-[18rem] max-h-[90%] overflow-y-auto">
                  <NavigationHeaderButton viewNavigation={viewNavigation} handleViewNavigationSelect={handleViewNavigationSelect} />
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
                            <GuidingDescriptionText>Click the add button to create new template</GuidingDescriptionText>
                            <FlexColCentered className="bg-green-200 dark:bg-green-800 w-full p-4 rounded">
                              <h2>Add Template</h2>
                            </FlexColCentered>
                            <FlexColCentered className="w-full" >
                              <AddTemplateButton onClick={handleCreateTemplate} />
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



const AddButton = tw.button`
w-full
bg-gray-400
rounded
p-4
text-gray-900
dark:text-gray-500
dark:bg-gray-700
hover:bg-gray-500
hover:dark:text-gray-300
`

const AddTemplateButton = ({ onClick }: any) => {
  return <AddButton className="w-full" onClick={onClick}>
    <FlexColCentered>
      <FaPlus />
    </FlexColCentered>
  </AddButton>
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const token = cookies && cookies.supabaseToken
  const userID = cookies && cookies.userID
  return {
    props: {
      authenticated: Boolean(token),
      userID: userID || null,
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}
export default Page;