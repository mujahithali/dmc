function DMS()
{
    
}

DMS.prototype.initDMS = function()
{
    let _self = this;

    _self.renderHeaderMenu();
};

DMS.prototype.renderHeaderMenu = function()
{
    let _self = this;

    let headerMenuHtml = $("#headerMenuHtmlTempl").html();

    $('.mainCont').html(headerMenuHtml);

    _self.registerHeaderMenuEvents();
    _self.renderHomePageContent();
};

DMS.prototype.registerHeaderMenuEvents = function()
{
    let _self = this;

    $('.headerHomePageContainerDiv').on('click', function()
    {
        if(!($(this).hasClass('selected')))
        {
            _self.renderHomePageContent();
        }
    });    
    
    $('.headerToolsPageContainerDiv').on('click', function()
    {
        if(!($(this).hasClass('selected')))
        {
            _self.renderToolsPageContent();
        }
    });
};

DMS.prototype.renderHomePageContent = function()
{
    let _self = this;

    $('.headerMenuTab').removeClass('selected');
    $('.headerHomePageContainerDiv').addClass('selected');   
    
    let homePageContentHtml = $("#homePageContentHtmlTempl").html();    

    $('.bottomMainContainerDiv').html(homePageContentHtml);
    _self.renderWorkspaceContent();    
};

DMS.prototype.renderWorkspaceContent = function()
{
    let _self = this;

    let workspaceContentHtml = "" + 
    "<div class='wsMenuTextContainerDiv'>";

    for(let i=0; i<workspaceData.length; i++)
    {
        workspaceContentHtml += "" +
        "<div class='wsMenuTextContDiv' hy='"+ workspaceData[i].hierarchy +"' info='"+ (workspaceData[i].info ? workspaceData[i].info : "") +"'>" +
            "<div class='wsMenuTextIconDiv'>";

            if(workspaceData[i].subMenu && workspaceData[i].subMenu.length > 0)
            {
                workspaceContentHtml += "<img class='hpWsTilteArrShowHideImg' sts='hide' src='img/arrHide.png'/>";
            }            
            
            workspaceContentHtml += "</div>" +
            "<div class='wsMenuTextDiv'>" + workspaceData[i].menuName + "</div>" +
        "</div>";
        
        if(workspaceData[i].subMenu && workspaceData[i].subMenu.length > 0)
        {
            workspaceContentHtml += "<div class='wsSubMenuTextContainerDiv' parHy='"+ workspaceData[i].hierarchy +"'>";

            for(let j=0; j<workspaceData[i].subMenu.length; j++)
            {
                workspaceContentHtml += "" +
                "<div class='wsSubMenuTextContDiv' info='"+ (workspaceData[i].subMenu[j].info ? workspaceData[i].subMenu[j].info : "") +"'>" +
                    "<div class='wsSubMenuTextIconDiv'>";
        
                    if(workspaceData[i].subMenu[j].subMenu && workspaceData[i].subMenu[j].subMenu.length > 0)
                    {
                        workspaceContentHtml += "<img class='hpWsSmTilteArrLeftRightImg' sts='hide' src='img/arrHide.png'/>";
                    }
                    
                    workspaceContentHtml += "</div>" +
                    "<div class='wsSubMenuTextDiv'>" + workspaceData[i].subMenu[j].submenuName + "</div>" +
                "</div>";
            }

            workspaceContentHtml += "</div>";  
        }        
    }

    workspaceContentHtml += "</div>";    

    $('.hpWsContentContainerDiv').html(workspaceContentHtml);
    _self.registerHomePageEvents();
};


DMS.prototype.registerHomePageEvents = function()
{
    let _self = this;

    $('.hpMenuArrUpDownImg').on('click', function()
    {
        $(".hpIc1ImgDiv").toggle(300, function()
        {
            let sts = $('.hpMenuArrUpDownImg').attr('sts');
            let imgSrc = (sts == "down" ? 'img/arrUp.png' : 'img/arrDown.png');
            let imgSts = (sts == "down" ? 'up' : 'down');

            $('.hpMenuArrUpDownImg').attr({'src':imgSrc, 'sts':imgSts});
        });            
    }); 

    $('.hpWsTilteArrLeftRightImg').on('click', function()
    {
        $(".hpWsContentContainerDiv").toggle(10);

        $(".hpWsTilteDiv").toggle(10, function()
        {
            let sts = $('.hpWsTilteArrLeftRightImg').attr('sts');
            let imgSrc = (sts == "left" ? 'img/arrRight.png' : 'img/arrLeft.png');
            let imgSts = (sts == "left" ? 'right' : 'left');

            $('.hpWsTilteArrLeftRightImg').attr({'src':imgSrc, 'sts':imgSts});
        });       
    });
    
    $('.wsMenuTextContDiv, .wsSubMenuTextContDiv').on('click', function(el)
    {        
        let info = $(this).attr('info');
        let currHy = $(this).attr('hy');
        let currImgEle = $(this).find('img')

        if(info)
        {
            $('.hpDocContentDiv').html(info);
        }
        else if(currHy)
        {
            //$('.wsSubMenuTextContainerDiv').hide();
            $('.wsSubMenuTextContainerDiv[parHy="'+ currHy +'"]').toggle(10, function()
            {
                let sts = $(currImgEle).attr('sts');
                let imgSrc = (sts == "hide" ? 'img/arrShow.png' : 'img/arrHide.png');
                let imgSts = (sts == "hide" ? 'show' : 'hide');

                $(currImgEle).attr({'src':imgSrc, 'sts':imgSts});
            });
        }
    });    

    $('.hpIc1ImgClickContainerDiv').on('click', function(el)
    {
        let currTarg = $(el.currentTarget);       

        alert($(el.target).attr('typ') + ' menu clicked !!!');
    });    
};

DMS.prototype.renderToolsPageContent = function()
{
    let _self = this;

    $('.headerMenuTab').removeClass('selected');
    $('.headerToolsPageContainerDiv').addClass('selected');   
    
    let toolsPageContentHtml = "<div class='toolsContentDiv'>Tools Content Html here ...<div>";

    $('.bottomMainContainerDiv').html(toolsPageContentHtml);
};

let DMS_OBJ = "";

function pageInit()
{
    DMS_OBJ = new DMS();
    DMS_OBJ.initDMS();
}