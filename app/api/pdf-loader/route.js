import { NextResponse } from "next/server";
import {WebPDFLoader} from '@langchain/community/document_loaders/web/pdf'
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters'
export async function GET(req){
    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log(pdfUrl)
    // const pdfUrl = "https://shiny-seal-705.convex.cloud/api/storage/815bf410-b0e9-426c-9ee8-d8927b60d6b6"

    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data)
    const docs = await loader.load();

    let pdfTextcontent ='';
    docs.forEach(doc => {
        pdfTextcontent += doc.pageContent
        
    });

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:100,
        chunkOverlap:20
     });

     const output = await splitter.createDocuments([pdfTextcontent])

     let splitterList =[];
        output.forEach(doc => {
            splitterList.push(doc.pageContent)
        });



    return NextResponse.json({result: splitterList});

}